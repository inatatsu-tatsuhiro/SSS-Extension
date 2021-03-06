import React, { Dispatch, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import Typography from '../../../_general/components/Typography'
import Button from '../../../_general/components/Button'
import { SignedTransaction } from 'symbol-sdk'
import {
  deleteAllAccount,
  deleteAllDomain,
  getHistory,
  initializeSetting,
  version,
} from '../../../_general/lib/Storage'
import {
  Setting,
  setSetting as setExtensionSetting,
} from '../../../_general/lib/Storage/Setting'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'

import { MdExpandMore } from 'react-icons/md'
import { IconContext } from 'react-icons'
interface Props {
  reload: () => void
  update: Date
  setting: Setting
  setSetting: Dispatch<Setting>
}

const langs = [
  {
    key: '日本語',
    value: 'JA',
  },
  {
    key: 'English',
    value: 'EN',
  },
  {
    key: '한국어',
    value: 'KO',
  },
  {
    key: 'Русский',
    value: 'RU',
  },
  {
    key: 'Italian',
    value: 'IT',
  },
  // {
  //   key: '中文简体',
  //   value: 'ZH',
  // },
  // {
  //   key: 'ウクライナ',
  //   value: 'UK',
  // },
]

const Options: React.VFC<Props> = ({ reload, update, setting, setSetting }) => {
  const [history, setHistory] = useState<SignedTransaction[]>([])

  const [t] = useTranslation()

  useEffect(() => {
    getHistory().then((h) => {
      setHistory(h)
    })
  }, [update])

  const save = () => {
    const historyText =
      'SSS Extension Sign History \n======================\n' +
      history.map((h) => JSON.stringify(h)).join('\n======================\n')
    const blob = new Blob([historyText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const now = new Date()
    const filename = `SSS_SignHistory-${now.getFullYear()}/${now.getMonth()}/${now.getDate()}-.txt`
    a.download = filename
    a.href = url
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const changeLang = (val: string) => {
    const newSetting: Setting = {
      lang: val,
      session: setting.session,
    }

    setSetting(newSetting)
    setExtensionSetting(newSetting)
    reload()
  }

  const init = () => {
    console.log('init')
    if (window.confirm('realy?')) {
      initializeSetting()
    }
  }
  const initAccount = () => {
    console.log('init')
    if (window.confirm('realy?')) {
      deleteAllAccount()
    }
  }
  const initDomain = () => {
    console.log('init')
    if (window.confirm('realy?')) {
      deleteAllDomain()
    }
  }

  return (
    <Root>
      <Wrapper>
        <Column>
          <Typography text={t('setting_sign_history')} variant="h5" />
          <Typography text={t('setting_sign_history_e')} variant="subtitle1" />
        </Column>
        <Center>
          <Button text={t('setting_sign_history_btn')} onClick={save} />
        </Center>
      </Wrapper>
      <Wrapper>
        <Column>
          <Typography text={t('setting_change_langage')} variant="h5" />
          <Typography
            text={t('setting_change_langage_e')}
            variant="subtitle1"
          />
        </Column>
        <Center>
          <FormControl sx={{ width: 160 }}>
            <InputLabel id="demo-multiple-name-label">Langage</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={setting.lang}
              onChange={(e) => changeLang(e.target.value)}
              input={<OutlinedInput label="Name" />}>
              {langs.map((l) => (
                <MenuItem key={l.key} value={l.value}>
                  {l.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Center>
      </Wrapper>
      <Wrapper>
        <Column>
          <Typography text="Version" variant="h5" />
        </Column>
        <Center>
          <Typography text={version} variant="subtitle1" />
        </Center>
      </Wrapper>
      <Wrapper>
        <SAccordion>
          <AccordionSummary
            expandIcon={
              <IconContext.Provider value={{ size: '24px' }}>
                <MdExpandMore style={{ margin: '6px' }} />
              </IconContext.Provider>
            }
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography text="データ削除" variant="h5" />
          </AccordionSummary>
          <AccordionDetails>
            <Wrapper>
              <Column>
                <Typography
                  text="すべてのアカウントの登録を解除する"
                  variant="h5"
                />
              </Column>
              <Center>
                <Button text="DELETE" onClick={initAccount} />
              </Center>
            </Wrapper>
            <Wrapper>
              <Column>
                <Typography
                  text="すべてのアプリケーションとの連携を解除する"
                  variant="h5"
                />
              </Column>
              <Center>
                <Button text="DELETE" onClick={initDomain} />
              </Center>
            </Wrapper>
            <Wrapper>
              <Column>
                <Typography
                  text="SSS_Extension上のすべてのデータを削除する"
                  variant="h5"
                />
              </Column>
              <Center>
                <Button text="DELETE" onClick={init} />
              </Center>
            </Wrapper>
          </AccordionDetails>
        </SAccordion>
      </Wrapper>
    </Root>
  )
}

export default Options

const Root = styled('div')({
  margin: '32px 10vw',
  minWidth: '60vw',
  width: '600px',
})
const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '8px',
  padding: '16px',
  background: 'white',
})
const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'column',
})

const SAccordion = styled(Accordion)({
  boxShadow: 'none',
  background: 'white',
  width: '100%',
  '> div': {
    padding: '0px',
    paddingRight: '16px',
  },
  ':before': {
    opacity: '0 !important',
  },
})
