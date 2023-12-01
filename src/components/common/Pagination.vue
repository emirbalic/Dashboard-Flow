<template>
    <!-- <container> -->
      <div class="statistics">
        <div class="container">
          <div class="triple footer">
            <div>
              <span v-if="count > 0">
                Showing {{ (currentPage - 1) * perPage + 1 }} to
                {{
                  currentPage * perPage < count ? currentPage * perPage : count
                }}
                out of {{ count }} results
              </span>
              <span v-else> No results </span>
            </div>
            <div>
              <span
                v-if="currentPage - 1 > 0"
                @click="
                  updatePage(1);
                  calculateLeftDistance(currentPage);
                "
                class="pageList"
                >First</span
              >
              <span
                class="pageList"
                v-if="currentPage - 100 > 0"
                @click="
                  updatePage(currentPage - 100);
                  calculateLeftDistance(currentPage);
                "
              >
                ...-100
              </span>
              <span
                @click="
                  updatePage(currentPage - (leftDistance - i));
                  calculateLeftDistance(currentPage);
                "
                v-for="(page, i) in leftDistance"
                :key="i"
                class="pageList"
              >
                {{ currentPage - (leftDistance - i) }}
              </span>
  
              <span class="currentPage selectedPage">Page {{ currentPage }}</span>
  
              <span
                @click="
                  updatePage(currentPage + 1 + i);
                  calculateLeftDistance(currentPage);
                  calculateRightDistance(currentPage);
                "
                v-for="(page, i) in rightDistance"
                :key="i"
                class="pageList"
                >{{ currentPage + 1 + i }}</span
              >
              <span
                class="pageList"
                v-if="currentPage + 100 < numberOfPages"
                @click="updatePage(currentPage + 100)"
              >
                ...+100
              </span>
              <span
                v-if="currentPage != numberOfPages"
                @click="
                  updatePage(numberOfPages);
                  calculateRightDistance(currentPage);
                "
                class="pageList"
                >Last</span
              >
            </div>
            <div>
              <span class="small">Items per page:</span>
              <select v-model="perPage" @change="updateTableSize">
                <option :value="10">10</option>
                <option :value="15">15</option>
                <option :value="30">30</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    <!-- </container> -->
  </template>
  <script lang="ts">
  import { computed, defineComponent, onMounted, ref, watch } from 'vue';
  
  import { useStore } from 'vuex';
  import Container from '@/components/common/Container.vue';
  import { IPaginationDetailedInfo } from '@/models/IUtilModels';
  
  export default defineComponent({
    components: {
      Container,
    },
  
    emits: ['reset-tab', 'update-page', 'update-table-size'],
  
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      isTabChanged: {
        type: Boolean,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      numberOfPages: {
        type: Number,
        required: true,
      },
    },
  
    setup(props, { emit }) {
      let leftDistance = ref(0);
      let rightDistance = ref(5);
      let paginationDistance: IPaginationDetailedInfo;
  
          let currentPage = computed(() => {
        return props.currentPage;
      });
  
      let isTabChanged = computed(() => {
        return props.isTabChanged;
      })
  
      const store = useStore();
      onMounted(async () => {
        let distanceInfoFromStore = await store.getters[
          'actionlist/getPaginationDistance'
        ];
  
        if (distanceInfoFromStore !== undefined) {
          leftDistance.value = distanceInfoFromStore.leftDistance;
          rightDistance.value = distanceInfoFromStore.righDistance;
        }
      });
  
      watch(
        () => props.isTabChanged,
        () => {
          if(isTabChanged) {
            leftDistance.value = 0;
            rightDistance.value = 5;
            resetTabs();
          }
        }
      );
  
      const count = computed(() => {
        return props.count;
      });
  
      const numberOfPages = computed(() => {
        return props.numberOfPages;
      });
  
      const perPage = ref(10);
  
      const calculateRightDistance = async (page: number) => {
        let current = Number(currentPage);
  
        if (numberOfPages.value === current) {
          rightDistance.value = 0;
          leftDistance.value = 5;
        }
  
        await setDistanceToStore(page);
      };
  
      const calculateLeftDistance = async (page: any) => {
        let current = Number(currentPage);
        let pages = Number(numberOfPages.value);
  
        if (current <= 5) {
          switch (current) {
            case 1:
              leftDistance.value = 0;
              rightDistance.value = 5;
              break;
            case 2:
              leftDistance.value = 1;
              rightDistance.value = 5;
              break;
            case 3:
              leftDistance.value = 2;
              rightDistance.value = 5;
              break;
            case 4:
              leftDistance.value = 3;
              rightDistance.value = 5;
              break;
            case 5:
              leftDistance.value = 4;
              rightDistance.value = 5;
              break;
          }
        } else if (current > 5) {
          leftDistance.value = 5;
          switch (pages - current) {
            case 1:
              rightDistance.value = 1;
              break;
            case 2:
              rightDistance.value = 2;
              break;
            case 3:
              rightDistance.value = 3;
              break;
            case 4:
              rightDistance.value = 4;
              break;
            case 5:
              rightDistance.value = 5;
              break;
          }
        }
        await setDistanceToStore(page);
      };
  
      const resetTabs = () => {
        emit('reset-tab', false);
      }
  
      const setDistanceToStore = async (page: any) => {
        paginationDistance = {
          leftDistance: leftDistance.value,
          righDistance: rightDistance.value,
        };
        // await store.dispatch(
        //   'actionlist/setPaginationDistance',
        //   paginationDistance
        // );
      };
  
      const updatePage = (page: any) => {
        if (page <= 0 || page > numberOfPages.value) return;
        // store.dispatch('actionlist/setPageNumber', page);
        emit('update-page', page);
        currentPage = page;
      };
  
      const updateTableSize = async () => {
        //
        leftDistance.value = 0;
        rightDistance.value = 5;
        emit('update-table-size', perPage);
      };
  
      return {
        count,
        leftDistance,
        currentPage,
        numberOfPages,
        perPage,
        rightDistance,
  
        calculateLeftDistance,
        calculateRightDistance,
        resetTabs,
        updatePage,
        updateTableSize,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped >

.has-popup {
    position: relative;
    cursor: pointer;
  }
  
  .popup {
    position: absolute;
    top: 0;
    transform: scale(0);
    transition: transform 0.1s ease-in;
    font-size: 12px;
    font-weight: 600;
    color: #000;
    background-color: white;
    padding: 0.1rem 1rem;
    border: 1px solid black;
    border-radius: 5px;
    white-space: nowrap;
  }
  .has-popup:hover span {
    transform: translateX(-4rem) translateY(-0.8rem) scale(1);
  }
  
  .container-body {
    padding: 0 40px;
    overflow-y: auto;
    height: calc(100vh - 72px);
  }
  
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 18px;
  
    .icon {
      height: 20px;
      width: 20px;
      vertical-align: -4px;
    }
    button {
      padding: 8px 12px;
      color: #fff;
      font-family: 'Roboto';
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      background: #a4abb5;
      border: none;
      border-radius: 3px;
    }
  
    .confirm {
      background: #1caea1;
    }
  
    .danger {
      background: #dd3e33;
    }
  }
  .statistics {
    .container {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 24px;
  
      .content {
        position: relative;
        height: 244px;
        width: 1fr;
        padding: 24px;
        box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
      }
  
      .no-shadow {
        padding: 0;
        box-shadow: none;
      }
  
      .double {
        grid-column: span 2;
      }
  
      .triple {
        grid-column: span 3;
      }
  
      .twix {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 24px;
      }
  
      .medium {
        height: 400px;
      }
  
      .large {
        height: auto;
      }
  
      .footer {
        margin: 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
  
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #2d4059;
  
        span {
          opacity: 0.6;
        }
  
        select {
          margin-top: -10px;
          margin-left: 10px;
          padding: 10px;
        }
        .pageList,
        .currentPage {
          border: 1px solid #2d4059;
          padding: 5px 10px;
          user-select: none;
        }
        .pageList:hover {
          cursor: pointer;
        }
        .selectedPage {
          opacity: 1;
          pointer-events: none;
        }
        .small {
          font-size: 12px;
        }
      }
  
      table {
        width: 100%;
        font-size: 12px;
  
        thead {
          background-color: #eff4fa;
          font-weight: 600;
          th {
            padding: 8px;
          }
        }
  
        tbody {
          tr:nth-child(2n) {
            background-color: #eff4fa;
          }
          td {
            text-align: center;
            padding: 8px;
            .icon {
              height: 20px;
              width: 20px;
              cursor: pointer;
            }
          }
        }
  
        .right {
          text-align: end;
        }
        .left {
          text-align: start;
        }
        .bolded {
          font-weight: bold;
        }
  
        input[type='checkbox'] {
          width: 18px;
          height: 18px;
          accent-color: #e0007a;
        }
      }
    }
  }
</style>