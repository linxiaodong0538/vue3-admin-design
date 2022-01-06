<!--
 * @Description: 
 * @Author: Lx
 * @Date: 2021-07-16 10:39:50
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-11 11:39:29
-->
<template>
  <div :class="[isCollapse ? 'simple-mode' : 'full-mode', { 'first-level': isFirstLevel }]">
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children.length">
      <SidebarItemLink v-if="theOnlyOneChild.name" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <i v-if="theOnlyOneChild.source" :class="theOnlyOneChild.source"></i>
          <span v-if="theOnlyOneChild.name">{{ theOnlyOneChild.name }}</span>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i v-if="item.source && item.source" :class="item.source"></i>
        <span v-if="item.name">{{ item.name }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { computed, defineComponent, PropType, ComputedRef } from 'vue'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

interface A {
  source: any
}
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    isFirstLevel: {
      type: Boolean,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  components: {
    SidebarItemLink
  },
  setup(props) {
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item: any) => {
          if (item.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {

      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        // console.log('props.item.children',props.item.children)
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }

      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...props.item, path: '' }
    })

    const resolvePath = (routePath: string) => {

      if (isExternal(routePath)) {

        return routePath
      }
      if (isExternal(props.basePath)) {

        return props.basePath
      }

      return path.resolve(props.basePath, routePath)
    }
    const { t } = useI18n()
    onMounted(() => { })
    return {
      t,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>

<style lang="scss" scoped>
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {

  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
  .el-menu-item {
    & > span {
      display: inline-block;
      padding-left: 5px;
    }
  }
  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      .el-submenu__icon-arrow {
        display: none !important;
      }
      .menu-icon {
        display: none;
      }

      & > span {
        padding-left: 5px;
        display: none;
      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.iconfont {
  color: #fff;
  margin-right: 10px;
}
svg {
  margin-right: 16px;
}

.simple-mode {
  svg {
    margin-left: 20px;
  }
}
 .full-mode{
  &::v-deep .el-submenu__icon-arrow{
    display: none;
  }
}
</style>
