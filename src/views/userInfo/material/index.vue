<script setup lang="ts">
import { Tabs, Tag, Collapse } from 'ant-design-vue';
import info from './javaScript';

const Prefix = 'material';
const colorModule = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
// 此处不可以使用 reactive，因为在源码中其返回的是一整个数组，vue3 中对于 将[] 完全换为 [1,2,3] 是无法触发响应式的
const activeKeys = ref([]);
const { Panel } = Collapse;

// tabs 相关
const { TabPane } = Tabs;
const tabsData = reactive([] as Record<string, any>[]);
let activeTabsKey = ref('');

// 创造对应的 tab 数据
const createTabsData = () => {
  // 通过 types 进行分组，目前起码会存在一条数据
  info.forEach((item) => {
    const name = (item.types && item.types[1]) || '其他';
    if (tabsData.length) {
      const index = tabsData.findIndex((item) => item.name === name);
      if (index > -1) {
        tabsData[index].children.push(item);
      } else {
        const obj = {
          name,
          children: [item],
        };
        tabsData.push(obj);
      }
    } else {
      const obj = {
        name,
        children: [item],
      };
      tabsData.push(obj);
    }
    activeTabsKey = tabsData[0].name;
  });
};
createTabsData();

const handleCollapseChange = (key) => {
  console.log(key);
};

// 目前的 info 是数组格式，里面每一条数据都是相同格式
</script>

<template>
  <div v-if="info && Array.isArray(info) && info.length">
    <Tabs v-model:activeKey="activeTabsKey" tab-position="left">
      <TabPane v-for="tab in tabsData" :key="tab.name" :tab="tab.name">
        <div v-for="item in info" :key="item.name" :class="`${Prefix}`">
          <div>
            <Collapse v-model:activeKey="activeKeys" @change="handleCollapseChange">
              <Panel :key="item.name">
                <template #header>
                  <div :class="`${Prefix}-header`">
                    <span :class="`${Prefix}-header-label`">{{ item.name }}</span>
                    <Tag v-for="(tag, index) in item.tags || []" :key="tag" :color="colorModule[index] || '#108ee9'">{{ tag }}</Tag>
                  </div>
                  <!-- <div v-html="item.desc"></div> -->
                </template>
                <div v-html="item.answer"></div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss">
.material {
  border: 1px solid #e3e3e3;
  padding: 12px;
  &-header {
    padding: 4px 8px;
    display: flex;
    align-items: center;
    &-label {
      margin-right: 6px;
    }
  }
  ::v-deep(.ant-collapse-header) {
    align-items: center;
  }
}
</style>
