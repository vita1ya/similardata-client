import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropZone = (props) => {
  const { readExcel } = props

  const onDrop = useCallback(acceptedFiles => {
    readExcel(acceptedFiles[0])
  }, [readExcel])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
    maxFiles: 1
  })

  return (
    <div className="upload">
      <div { ...getRootProps({ className: 'dropzone' }) }>
        <input { ...getInputProps() } />
        { <span>Нажмите&nbsp;для&nbsp;выбора&nbsp;файла или перетащите&nbsp;его&nbsp;сюда (.xlsx,&nbsp;.xls)</span> }
      </div>
    </div>
  )
}

export default DropZone
