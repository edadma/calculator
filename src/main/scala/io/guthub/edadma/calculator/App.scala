package io.guthub.edadma.calculator

import com.raquo.laminar.api.L.{*, given}

import org.scalajs.dom
import scala.concurrent.ExecutionContext.Implicits.global
import scala.scalajs.js
import js.Thenable.Implicits._
import js.JSConverters._

val buttons =
  List(
    (104, 621, 154, 673) -> '0',
    (103, 546, 154, 597) -> '1',
    (179, 545, 228, 595) -> '2',
    (106, 325, 158, 371) -> 'C',
    (257, 620, 306, 672) -> '=',
    (334, 622, 382, 668) -> '+',
    (332, 547, 381, 594) -> '-',
  )
val displayVar = Var("0")
val displaySignal = displayVar.signal
var current: Double = 0
var previous: Double = 0
var operation: Char = ' '
var calculation: Boolean = false
var first = true

def perform(op: Char): PartialFunction[(Double, Double), Double] =
  op match
    case '+' => _ + _
    case '-' => _ - _

def press(c: Char): Unit =
  c match
    case '0' | '1' | '2' =>
      if first then
        displayVar set c.toString
        first = false
      else displayVar.update(v => v :+ c)
    case '+' | '-' =>
      operation = c
      calculation = true
      current = displaySignal.now().toDouble
      first = true
    case '=' =>
      if calculation then
        previous = current
        current = displaySignal.now().toDouble

        val result = perform(operation)(previous, current)

        current = result
        calculation = false
        displayVar set result.toString
    case 'C' =>
      displayVar set "0"
      first = true
      calculation = false
      previous = 0

def App =
  div(
    cls := "relative",
    img(
      src := "./img.png",
      onClick --> { event =>
        println((event.clientX, event.clientY))
        buttons find { case ((x1, y1, x2, y2), _) =>
          x1 <= event.clientX && event.clientX <= x2 &&
          y1 <= event.clientY && event.clientY <= y2
        } match
          case None         =>
          case Some((_, c)) => press(c)
      },
    ),
    div(
      idAttr := "screen",
      cls := "absolute text-teal-300 text-3xl italic float-right flex justify-end bg-gray-600 bg-opacity-100 left-[111px] top-[107px] w-[258px] h-[36px]",
      child.text <-- displaySignal,
    ),
  )

// https://www.keshikan.net/fonts-e.html
