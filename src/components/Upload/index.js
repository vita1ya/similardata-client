import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { TextInput } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

import './upload.sass'

const Upload = props => {
  const { readExcel, nameBatch, setNameBatch, countLoads } = props

  const onDrop = useCallback(acceptedFiles => {
    readExcel(acceptedFiles[0])
    // eslint-disable-next-line
  }, [nameBatch, countLoads])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
    maxFiles: 1
  })

  return (
    <div className="upload">
      <TextInput
        id='name-load'
        label='Наименование списка'
        value={ nameBatch }
        noLayout
        s={ 12 }
        onChange={ e => setNameBatch(e.target.value) }
      />
      <div { ...getRootProps({ className: 'dropzone' }) }>
        <input { ...getInputProps() } />
        <FontAwesomeIcon icon={ faFileUpload } size='3x'/>
        { <span>Нажмите&nbsp;для&nbsp;выбора&nbsp;файла или перетащите&nbsp;его&nbsp;сюда (.xlsx,&nbsp;.xls)</span> }
      </div>
    </div>
  )
}

export default Upload
