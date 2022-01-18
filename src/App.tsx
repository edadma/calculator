import React, { useState } from 'react'
import { Button, Card, Grid, ThemeProvider, Text, Elem } from '@edadma/react-tailwind'
import { DefaultTheme } from '@edadma/react-tailwind/dist/themes/DefaultTheme'

interface State {
  display: string
  op: string | null
}

function App() {
  const [state, setState] = useState<State>({ display: '0', op: null })

  const Key: React.FC = ({ children }) => <Button rounded={false}>{children}</Button>
  return (
    <ThemeProvider value={DefaultTheme}>
      <Card bg="primary" className="w-3/12">
        <Grid cols={1}>
          <Card pad={2} className="flex bg-gray-800">
            <Text size="lg" className="flex-1 text-white" align="right">
              {state.display}
            </Text>
          </Card>
          <Grid cols={6}>
            <Key>7</Key>
            <Key>8</Key>
            <Key>9</Key>
            <Key>÷</Key>
            <Key>⤺</Key>
            <Key>4</Key>
            <Key>5</Key>
            <Key>6</Key>
            <Key>×</Key>
            <Key>C</Key>
            <Key>1</Key>
            <Key>2</Key>
            <Key>3</Key>
            <Key>-</Key>
            <Key>0</Key>
            <Key>.</Key>
            <Key>%</Key>
            <Key>+</Key>
            <Elem rowSpan="2" className="flex">
              <Button className="flex-1" role="primary" rounded={false}>
                =
              </Button>
            </Elem>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default App
