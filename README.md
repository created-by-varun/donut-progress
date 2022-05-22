# donut-progress-react-native

A highly customisable animated donut progress chart for react native

## Installation

```sh
npm install donut-progress
```

![](./assets/donut-progress.GIF)

## Usage

```js
<DonutProgress
    color='cyan'
    appendText="%"
    edgeCurved
    fontSize={30}
    radius={100}
    strokeWidth={10}
    duration={1500}
    percentage={86}
    max={100}
/>
```

## Available props

| Available props | Prop types | Description                                                                                                                  | Default value                        |
|-----------------|------------|------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| percentage      | number     | Value to be displayed in the graph                                                                                           | 75                                   |
| max             | number     | Max value of donut chart                                                                                                     | 100                                  |
| radius          | number     | Radius of donut chart                                                                                                        | 40                                   |
| strokeWidth     | number     | Thickness of the circular bar                                                                                                | 10                                   |
| duration        | number     | Duration of the animation (in ms)                                                                                            | 500                                  |
| color           | string     | chart color                                                                                                                  | "#3A50CF"                            |
| delay           | number     | Time delay in ms to wait before the animation starts                                                                         | 500                                  |
| textColor       | string     | Color of the text within the donut chart                                                                                     | Defaulted to 'color' property passed |
| fontSize        | number     | Font size                                                                                                                    | Defaulted to: radius/2               |
| fontWeight      | string     | Font weight                                                                                                                  | 500                                  |
| bgStrokeOpacity | string     | Opacity of the background of the progress bar                                                                                | '0.2'                                |
| rotation        | number     | Orientation of the starting point of the donut chart. (passing 180 will place the starting point of the graph at the bottom) | 0                                    |
| appendText      | string     | String to be appended after the percentage value passed (eg: %)                                                              | null                                 |
| prependText     | string     | String to be prepended before the percentage value passed (eg: $)                                                            | null                                 |
| edgeCurved      | boolean    | Parameter to define if the edges of the chart will be rounded or flat                                                        | true                                 |
| fraction        | boolean    | Parameter to define if the text inside the chart is a fraction or not. When set to true, will default to: <percentage>/<max> | false                                |
| secondaryColor  | string     | Sets the color of the denominator of the fraction if fraction is passed as true                                              | Defaulted to 'color' property passed |
| barColor        | string     | Sets the color of the fraction bar, if fraction param is passed as true                                                      | Defaulted to 'color' property passed |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
