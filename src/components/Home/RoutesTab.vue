<script setup lang="ts">
import routesWithPropsImg from '~/assets/img/routes-with-props.png'

const selected = ref(null)

const simpleRoute = [
  {
    label: 'pages',
    children: [
      { label: '[page_name].vue' },
    ],
  },
]

const paramsRoute = [
  {
    label: 'pages',
    children: [
      {
        label: '[page_name].vue',
        children: [
          {
            label: 'index.vue',
          },
          {
            label: '[props].vue',
          },
        ],
      },
    ],
  },

]
</script>

<template>
  <div class="routes">
    <div class="routes-example">
      <div class="routes-example__title">
        <h6>
          Simple route
        </h6>
        <span data-name="tooltip">i
          <q-tooltip anchor="top middle" :offset="[0, 60]" max-width="300px">
            If you have only one page, you can use a simple architecture by creating a file where the file name will
            serve as the route for your page.
          </q-tooltip>
        </span>
      </div>
      <q-tree v-model:selected="selected" :nodes="simpleRoute" default-expand-all node-key="label" />

      <img :src="routesWithPropsImg" alt="example">

      <div class="links">
        <router-link to="/test">
          Simple route
        </router-link>
      </div>
    </div>
    <div class="routes-example">
      <div class="routes-example__title">
        <h6>
          Route with params
        </h6>
        <span data-name="tooltip">i
          <q-tooltip anchor="top middle" :offset="[0, 60]" max-width="300px">
            For more complex routes, a different architecture is used where the main route is not a file but a folder.
            Inside this folder, you can place the components that correspond to the route.
          </q-tooltip>
        </span>
      </div>

      <q-tree v-model:selected="selected" :nodes="paramsRoute" default-expand-all node-key="label" />

      <img :src="routesWithPropsImg" alt="example">
      <div class="links">
        <div>
          <router-link to="/hi">
            Simple route
          </router-link>
        </div>
        <div>
          <router-link to="/hi/user">
            Props route
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.routes {
  display: flex;
  justify-content: center;
  gap: 30px;

  &-example__title {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .links {
    font-size: 14px;

    a {
      color: $primary;
      font-weight: 600;
    }
  }

  h6 {
    margin: 0;
  }

  span[data-name='tooltip'] {
    background-color: $primary;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    cursor: help;
  }

  .q-tree {
    height: 134px;
  }
}
</style>
