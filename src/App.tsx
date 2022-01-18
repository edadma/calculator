import React, { MouseEventHandler, useReducer, useState } from 'react'
import { Button, Card, Grid, ThemeProvider, Text, Elem } from '@edadma/react-tailwind'
import { DefaultTheme } from '@edadma/react-tailwind/dist/themes/DefaultTheme'

interface State {
  display: string
  op: string | null
}

type Action = { type: 'digit'; digit: string } | { type: 'function'; func: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'digit':
      return {
        display: state.display === '0' ? action.digit : state.display + action.digit,
        op: state.op,
      }
    case 'function':
      switch (action.func) {
        case 'C':
          return { display: '0', op: null }
        case '⤺':
          return {
            display:
              (state.display.match(/[0-9]/g) || []).length === 1
                ? '0'
                : state.display.substring(0, state.display.length - 1),
            op: state.op,
          }
        case '.':
          return state.display.includes('.')
            ? state
            : { display: state.display + '.', op: state.op }
        case '±':
          return {
            display:
              state.display.substring(0, 1) === '-'
                ? state.display.substring(1)
                : state.display === '0'
                ? state.display
                : '-' + state.display,
            op: state.op,
          }
        default:
          throw new Error('Invalid')
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { display: '0', op: null })

  const handleDigitKeyClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch({ type: 'digit', digit: (e.target as HTMLButtonElement).firstChild?.nodeValue! })
  }

  const handleFunctionKeyClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch({ type: 'function', func: (e.target as HTMLButtonElement).firstChild?.nodeValue! })
  }

  const DigitKey: React.FC = ({ children }) => (
    <Button icon rounded={false} onClick={handleDigitKeyClick}>
      {children}
    </Button>
  )

  const FunctionKey: React.FC = ({ children }) => (
    <Button icon rounded={false} onClick={handleFunctionKeyClick}>
      {children}
    </Button>
  )

  return (
    <ThemeProvider value={DefaultTheme}>
      <Card pad={4} bg="primary" className="w-80">
        <Grid cols={5}>
          <Elem colSpan="5">
            <div className="flex bg-gray-800 p-2">
              <span className="flex-1 text-white text-xl font-bold font-mono text-right">
                {state.display}
              </span>
            </div>
          </Elem>
          <DigitKey>7</DigitKey>
          <DigitKey>8</DigitKey>
          <DigitKey>9</DigitKey>
          <FunctionKey>÷</FunctionKey>
          <FunctionKey>⤺</FunctionKey>
          <DigitKey>4</DigitKey>
          <DigitKey>5</DigitKey>
          <DigitKey>6</DigitKey>
          <FunctionKey>×</FunctionKey>
          <FunctionKey>C</FunctionKey>
          <DigitKey>1</DigitKey>
          <DigitKey>2</DigitKey>
          <DigitKey>3</DigitKey>
          <FunctionKey>-</FunctionKey>
          <Elem rowSpan="2" className="flex">
            <Button className="flex-1" role="primary" rounded={false}>
              =
            </Button>
          </Elem>
          <DigitKey>0</DigitKey>
          <FunctionKey>.</FunctionKey>
          <FunctionKey>±</FunctionKey>
          <FunctionKey>+</FunctionKey>
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

export default App
