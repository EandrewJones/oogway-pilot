import { UilPlus, UilTrash } from '@iconscout/react-unicons'
import React, { FC, useEffect } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import {
    populateSuggestions,
    setDecisionRatingUpdate,
} from '../../../features/decision/decisionSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { AiBox, inputStyle } from '../../../styles/utils'
import { shortLimit } from '../../../utils/constants/global'
import { fetcher } from '../../../utils/helpers/common'
import { AISuggestions } from '../../../utils/types/global'
import { ErrorWraperField } from '../../Utils/ErrorWraperField'

export const OptionTab: FC = () => {
    const decisionRatingUpdate = useAppSelector(
        state => state.decisionSlice.decisionRatingUpdate
    )
    const {
        register,
        control,
        getValues,
        formState: { errors },
    } = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    })
    useWatch({
        control,
        name: 'options',
    })
    const loadSuggestions = async () => {
        const question = getValues('question').replaceAll(' ', '%20')
        const context = getValues('context').replaceAll(' ', '%20')
        const data: AISuggestions = await fetcher(
            `/api/getAISuggestions?question=${question}&context=${context}`
        )
        useAppDispatch(populateSuggestions(data))
    }

    useEffect(() => {
        if (!decisionRatingUpdate) {
            useAppDispatch(setDecisionRatingUpdate(true))
        }
        loadSuggestions()
    }, [])

    const checkFilledFields = () => {
        const optionsArray = getValues(`options`)
        let check = false
        optionsArray.forEach((option: { name: string }) => {
            if (!option.name) {
                check = true
            }
        })
        return check
    }
    return (
        <>
            {fields.map((item, index) => (
                <div key={item.id} className={'flex items-start w-full'}>
                    <ErrorWraperField
                        errorField={
                            errors?.options &&
                            errors?.options[index]?.name?.message
                                ? errors?.options[index]?.name?.message
                                : ''
                        }
                    >
                        <>
                            <input
                                key={item.id}
                                className={inputStyle}
                                type="text"
                                placeholder={`Enter your Option ${index + 1}`}
                                {...register(`options.${index}.name` as const, {
                                    required: {
                                        value:
                                            index === fields.length - 1 &&
                                            index > 1
                                                ? false
                                                : true,
                                        message:
                                            'You must enter the required Option.',
                                    },
                                    maxLength: {
                                        value: shortLimit,
                                        message: `Option length should be less than ${shortLimit}`,
                                    },
                                })}
                            />
                            {(item as unknown as { isAI: boolean }).isAI && (
                                <div className={AiBox}>AI Suggestion</div>
                            )}
                        </>
                    </ErrorWraperField>
                    {index === fields.length - 1 ? (
                        index < 4 ? (
                            <button
                                className="p-1 my-2 ml-3 align-middle bg-primary disabled:bg-primary/40 rounded-full"
                                type="button"
                                disabled={checkFilledFields()}
                                onClick={() => {
                                    if (fields[index])
                                        append({ name: '', isAI: false })
                                }}
                            >
                                <UilPlus className={'fill-white'} />
                            </button>
                        ) : (
                            <button
                                className="p-1 my-2 ml-3"
                                type="button"
                                onClick={() => remove(index)}
                            >
                                <UilTrash className={'fill-neutral-700'} />
                            </button>
                        )
                    ) : index > 1 ? (
                        <button
                            className="p-1 my-2 ml-3"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            <UilTrash className={'fill-neutral-700'} />
                        </button>
                    ) : (
                        <span className="p-1 my-2 ml-3 w-8 h-8" />
                    )}
                </div>
            ))}
        </>
    )
}
