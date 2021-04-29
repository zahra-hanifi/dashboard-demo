<template>
  <v-navigation-drawer
      v-model="drawer"
      app>
    <v-list-item class="px-2">
      <v-list-item-content>
        <v-list-item-title>
          <span class="abbr-title">CT</span>
          <span>CREATIVE TIM</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list class="profile-list">
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              <v-avatar>
                <img
                    src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/faces/avatar.jpg"
                    style="width: 40px !important; height: 40px !important;">
              </v-avatar>
              Tania Andrew
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="item in profileItems"
            :key="item.title"
            nuxt
            exact
            link
            class="submenu"
        >
          <v-list-item-content>
            <v-list-item-title>
              <span class="submenu-abbr">{{ item.abbr }}</span>
              <span>{{ item.title }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav class="menu-items">
      <v-list-group
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :append-icon="item.append"
          :class="[ item.active ? 'activeTab' : '' ]"
      >
        <template slot="activator">
          <v-list-item-title
              style="color: #ffffff">
            {{ item.title }}
          </v-list-item-title>
        </template>
        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            link
            class="submenu">
          <v-list-item-content>
            <v-list-item-title>
              <span class="submenu-abbr">{{ subItem.abbr }}</span>
              <span class="tab">{{ subItem.title }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!--      <v-list-item
                v-for="item in items"
                :key="item.title"
                link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>-->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', append: '', active: true },
        { title: 'Pages', icon: 'mdi-image', append: 'mdi-menu-down', active: false, items: [
            { title: 'Pricing', abbr: 'P' },
            { title: 'RTL Support', abbr: 'RS' },
            { title: 'Timeline', abbr: 'T' },
            { title: 'Login Page', abbr: 'LP' },
            { title: 'Register Page', abbr: 'RP' },
            { title: 'Lock Screen Page', abbr: 'LSP' },
            { title: 'User Profile', abbr: 'UP' },
            { title: 'Error Page', abbr: 'EP' },
          ] },
        { title: 'Components', icon: 'mdi-view-comfy', append: 'mdi-menu-down', active: false, items: [
            { title: 'Multi Level Collapse', abbr: 'MLC', items: [{ title: 'Example', abbr: 'E' }] },
            { title: 'Buttons', abbr: 'B' },
            { title: 'Grid System', abbr: 'GS' },
            { title: 'Tabs', abbr: 'T' },
            { title: 'Notifications', abbr: 'N' },
            { title: 'Icons', abbr: 'I' },
            { title: 'Typography', abbr: 'T' },
          ] },
        { title: 'Forms', icon: 'mdi-clipboard-outline', append: 'mdi-menu-down', active: false, items: [
            { title: 'Regular Forms', abbr: 'RF' },
            { title: 'Extended Forms', abbr: 'EF' },
            { title: 'Validation Forms', abbr: 'VF' },
            { title: 'Wizards', abbr: 'W' }
          ] },
        { title: 'Tables', icon: 'mdi-grid', append: 'mdi-menu-down', active: false, items: [
            { title: 'Regular Tables', abbr: 'RT' },
            { title: 'Extended Tables', abbr: 'ET' },
            { title: 'Data Tables', abbr: 'DT' }
          ]  },
        { title: 'Maps', icon: 'mdi-map-marker', append: 'mdi-menu-down', active: false, items: [
            { title: 'Google Maps', abbr: 'GM' },
            { title: 'Full Screen Map', abbr: 'FSM' }
          ] },
        { title: 'Widgets', icon: 'mdi-widgets', append: '', active: false },
        { title: 'Charts', icon: 'mdi-chart-timeline-variant', append: '', active: false },
        { title: 'Calendar', icon: 'mdi-calendar-range', append: '', active: false }
      ],
      profileItems: [
        { title: 'My Profile', abbr: 'MP' },
        { title: 'Edit Profile', abbr: 'EP' },
        { title: 'Settings', abbr: 'S' }
      ]
    }
  },
}
</script>

<style lang="scss">
@import "../styles/variables.scss";

.v-navigation-drawer {
  background: linear-gradient(rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)),
  url('../assets/img/sidebar-1.jpg');
  background-position: center center;
  background-size: cover;

  .v-list-item {
    padding: 0 1rem !important;

    .v-list-item__content {
      .v-list-item__title {
        margin: .75rem 0;
        text-align: center !important;

        span {
          color: $white !important;
          font-size: 18px;
        }

        .abbr-title {
          margin: 0 15px 0 0;
        }
      }
    }
  }

  .v-list.menu-items {
    padding: .5rem .75rem !important;

    .v-list-item {
      .v-list-item__content {
        padding: 0 !important;

        .v-list-item__title {
          color: $white;
          text-align: left !important;
          font-size: 14px !important;
          font-weight: 300;
        }
      }
    }

    .v-list-group {
      margin: 1rem 0 !important;
    }

    .v-list-group__header__prepend-icon {
      margin-right: 18px !important;

      i {
        color: #cecfcf;
      }

      .v-list-item__content {
        .v-list-item__title {
          margin: 0 !important;
          color: $white !important;
        }
      }
    }

    .v-list-group__header__append-icon {
      margin: 0 !important;
      min-width: 24px !important;

      i {
        color: $white !important;
      }
    }

    .submenu.v-list-item {
      padding: 0 !important;

      span {
        font-size: 13px !important;
        font-weight: 400 !important;
      }

      .submenu-abbr {
        font-weight: 300 !important;
        margin: .5rem 1.5rem !important;
      }
    }

    .activeTab, .activeTab:hover, .activeTab:focus {
      background: $pink-2 !important;
      color: $white !important;
      border-radius: 4px !important;
      height: 40px !important;

      .v-list-group__header__prepend-icon {
        i {
          color: $light-pink !important;
        }
      }
    }
  }

  .v-list.profile-list {
    padding: .5rem 1rem !important;

    .v-list-item {
      .v-list-item__content {
        padding: 0 !important;

        .v-list-item__title {
          color: $white;
          text-align: left !important;
          font-size: 14px !important;
          font-weight: 300;
        }
      }
    }

    .v-list-group__header {
      padding: .5rem !important;

      .v-list-item__content {
        .v-list-item__title {
          margin: 0 !important;
        }
      }
    }

    .v-list-item__icon {
      margin: 0 !important;
      min-width: 24px !important;

      i {
        color: $white !important;
      }
    }

    .v-list-item.submenu {
      span {
        font-size: 13px !important;
        font-weight: 400;
      }

      .submenu-abbr {
        margin: .5rem 1rem .5rem .5rem;
        font-weight: 300;
      }
    }
  }
}

.v-divider {
  border-color: $gray !important;
  margin: 0 1rem;
}
</style>