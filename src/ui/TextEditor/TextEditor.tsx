import { ContentState, EditorProps, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { FieldError } from 'react-hook-form'

import { useUpload } from '@/hooks/useUpload'

import { FilesService } from '@/services/files/files.service'

import styles from './TextEditor.module.scss'

const Editor = dynamic(
	() => {
		return import('react-draft-wysiwyg').then((mod) => mod.Editor)
	},
	{ ssr: false }
)
export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type TypeEditorPropsField = EditorProps & IFieldProps
export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

export function uploadImageCallBack(file: any) {
	return new Promise((resolve, reject) => {
		const formData = new FormData()
		formData.append('file', file)
		const response = FilesService.SaveFile(formData, 'products')
		response.then((data) => {
			resolve({
				data: {
					link: data.url,
				},
			})
		})
		response.catch((e) => {
			reject(e)
		})
	})
}
const TextEditor: FC<ITextEditor> = ({
	placeholder,
	onChange,
	error,
	value,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] = useState(false)
	useEffect(() => {
		if (!isUpdated) {
			const defaultValue = value ? value : ''
			const blocksFromHtml = htmlToDraft(defaultValue)
			const contentState = ContentState.createFromBlockArray(
				blocksFromHtml.contentBlocks,
				blocksFromHtml.entityMap
			)
			const newEditorState = EditorState.createWithContent(contentState)
			setEditorState(newEditorState)
		}
	}, [value, isUpdated])
	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)
		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	}

	return (
		<div className={styles.wrapper}>
			<span>{placeholder}</span>
			<Editor
				toolbarClassName={styles.toolbar}
				editorClassName={styles.editor}
				wrapperClassName={styles.editorWrapper}
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					// inline: { inDropdown: true },
					// list: { inDropdown: true },
					// textAlign: { inDropdown: true },
					// link: { inDropdown: true },
					// history: { inDropdown: true },
					image: {
						uploadCallback: uploadImageCallBack,
						alt: { present: true, mandatory: true },
					},
				}}
			/>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}
export default TextEditor
