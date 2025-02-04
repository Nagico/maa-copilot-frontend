import { AppToaster } from 'components/Toaster'

import { CopilotDocV1 } from '../models/copilot.schema'
import { OperationListItem } from '../models/operation'
import { toShortCode } from '../models/shortCode'
import { snakeCaseKeysUnicode } from '../utils/object'

export const handleDownloadJSON = (operationDoc: CopilotDocV1.Operation) => {
  // pretty print the JSON
  const json = JSON.stringify(
    snakeCaseKeysUnicode(operationDoc, { deep: true }),
    null,
    2,
  )
  const blob = new Blob([json], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `MAACopilot_${operationDoc.doc.title}.json`
  link.click()
  URL.revokeObjectURL(url)

  AppToaster.show({
    message: '已下载作业 JSON 文件，前往 MAA 选择即可使用~',
    intent: 'success',
  })
}

export const handleCopyShortCode = (operation: OperationListItem) => {
  const shortCode = toShortCode(operation.id)
  navigator.clipboard.writeText(shortCode)

  AppToaster.show({
    message: '已复制神秘代码，前往 MAA 粘贴即可使用~',
    intent: 'success',
  })
}
