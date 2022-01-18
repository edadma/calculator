import React from 'react'
import {
  Button,
  Card,
  Grid,
  ThemeProvider,Text
} from '@edadma/react-tailwind'
import { DefaultTheme } from '@edadma/react-tailwind/dist/themes/DefaultTheme'

function App() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Card className="w-3/12">
        <Grid cols={1}>
          <Button>asdf</Button>
          <Grid cols={5} bg="primary">
            <Button>regular</Button>
            <Button role="info">info</Button>
            <Button role="success">success</Button>
            <Button role="warning">warning</Button>
            <Button role="error">error</Button>
            <Button outlined>regular</Button>
            <Button outlined role="info">
              info
            </Button>
            <Button outlined role="success">
              success
            </Button>
            <Button outlined role="warning">
              warning
            </Button>
            <Button outlined role="error">
              error
            </Button>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default App
