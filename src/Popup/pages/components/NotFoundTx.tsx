import React from 'react'

import styled from '@emotion/styled'
import Typography from '../../../_general/components/Typography'

const Component: React.VFC = () => {
  return (
    <Wrapper>
      <Typography text="NOT FOUND" variant="h4" />
    </Wrapper>
  )
}

export default Component

const Wrapper = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
