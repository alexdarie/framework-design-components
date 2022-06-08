# album-view-component



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default     |
| ------------- | ------------- | ----------- | --------- | ----------- |
| `albumtitle`  | `albumtitle`  |             | `string`  | `undefined` |
| `description` | `description` |             | `string`  | `undefined` |
| `energy`      | `energy`      |             | `number`  | `0`         |
| `gaveEnergy`  | `gave-energy` |             | `boolean` | `false`     |
| `idx`         | `idx`         |             | `string`  | `undefined` |
| `num`         | `num`         |             | `number`  | `0`         |
| `position`    | `position`    |             | `number`  | `0`         |
| `top`         | `top`         |             | `number`  | `10`        |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `energyUpdated` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- ion-item
- ion-button
- ion-icon
- ion-text
- ion-card
- ion-card-header
- ion-card-content
- ion-buttons
- ion-progress-bar

### Graph
```mermaid
graph TD;
  album-view-component --> ion-item
  album-view-component --> ion-button
  album-view-component --> ion-icon
  album-view-component --> ion-text
  album-view-component --> ion-card
  album-view-component --> ion-card-header
  album-view-component --> ion-card-content
  album-view-component --> ion-buttons
  album-view-component --> ion-progress-bar
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-button --> ion-ripple-effect
  ion-card --> ion-ripple-effect
  style album-view-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
