<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col col="12" sm="12">
          <v-row style="display: inline-block !important; width: 100% !important;">
            <v-toolbar flat :style="[ drawer ? { 'margin-left' : '172px' } : {} ]">
              <v-col cols="6" style="display: flex; align-items: center; margin-top: .5rem">
                <v-btn
                    elevation="1"
                    small
                    fab
                    icon
                    :ripple="false"
                    @click="fullyShowSidebar"
                    class="mx-2 sidebar-toggler">
                  <v-icon v-if="drawer === false">mdi-view-quilt</v-icon>
                  <v-icon v-if="drawer === true">mdi-dots-vertical</v-icon>
                </v-btn>
                <v-toolbar-title class="gray--text pl-0 font-weight-light">Dashboard</v-toolbar-title>
              </v-col>
              <v-col cols="6" class="toolbar-btn">
                <v-row>
                  <v-col cols="4" style="display: flex; justify-content: flex-end; align-items: center">
                    <v-text-field label="Search" class="search-input theme--light"></v-text-field>
                  </v-col>
                  <v-col cols="2" style="display: flex; justify-content: flex-end; align-items: center">
                    <v-btn
                        elevation="1"
                        small
                        fab
                        icon
                        :ripple="false"
                        class="ml-2 search-btn">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6"
                         style="display: flex; justify-content: flex-end;
                         align-items: center; padding: 0 !important;">
                    <div class="buttons">
                      <v-btn
                          small
                          class="mx-2 notification-btn">
                        <v-icon>mdi-view-dashboard</v-icon>
                      </v-btn>
                      <v-menu offset-y class="bellItems" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              small
                              class="mx-2 notification-btn"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-badge
                                overlap
                                color="red"
                                content="5"
                            >
                              <v-icon>mdi-bell</v-icon>
                            </v-badge>
                          </v-btn>
                        </template>
                        <v-list class="btn-submenu">
                          <v-list-item
                              v-for="(item, index) in bellItems"
                              :key="index"
                              link
                          >
                            <v-list-item-title>
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-menu offset-y transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              small
                              class="mx-2 notification-btn"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <v-icon>mdi-account</v-icon>
                          </v-btn>
                        </template>
                        <v-list class="btn-submenu" style="min-width: 200px !important;">
                          <v-list-item
                              v-for="(item, index) in accountItems"
                              :key="index"
                              link
                          >
                            <v-list-item-title>
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-toolbar>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Navbar :drawer="drawer" />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <div class="world-map">
              <v-card class="pa-3">
                <v-row>
                  <v-col cols="12">
                    <div style="display: flex; align-items: flex-start">
                      <v-icon class="elevation-6">mdi-earth</v-icon>
                      <span class="ml-4">Global Sales by Top Locations</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-data-table
                        :headers="headers"
                        :items="data"
                        hide-default-header
                        hide-default-footer>
                      <template slot="item.flagImage" slot-scope="props">
                        <img :src="props.item.flagImage" alt="" width="40">
                      </template>
                    </v-data-table>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-img src="./assets/img/map.png"></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <div class="weather" style="margin-top: 3rem">
              <v-card class="pa-3">
                <v-row>
                  <v-col cols="12">
                    <div style="display: flex; align-items: flex-start">
                      <v-icon class="elevation-6">mdi-weather-cloudy</v-icon>
                      <span class="ml-4">Current Weather In {{ cityName }}</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" class="d-flex justify-start flex-column align-center">
                    <p>Weather Status: <strong>{{ weatherData.main }}</strong></p>
                    <p>Weather Description: <strong>{{ weatherData.description }}</strong></p>
                    <v-icon
                        v-if="weatherData.main === 'Rain'"
                        class="weather-icon">mdi-weather-lightning-rainy</v-icon>
                    <v-icon
                        v-if="weatherData.main === 'Sun'"
                        class="weather-icon sunny">
                      mdi-weather-sunny
                    </v-icon>
                    <v-icon
                        v-if="weatherData.main === 'Cloud'"
                        class="weather-icon">
                      mdi-weather-cloudy
                    </v-icon>
                    <v-icon
                        v-if="weatherData.main === 'Wind'"
                        class="weather-icon">
                      mdi-weather-windy
                    </v-icon>
                    <v-icon
                        v-if="weatherData.main === 'Snow'"
                        class="weather-icon">
                      mdi-weather-snowy
                    </v-icon>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-img src="./assets/img/weather.jpg" width="65%"></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-row style="margin-top: 3rem">
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="chart-container">
                    <v-sparkline
                        :value="value"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        class="chart elevation-6 views-chart"
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #00cae3 !important;">
                            mdi-refresh
                          </v-icon>
                        </template>
                        <span>Refresh</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                          v-bind="attrs"
                          v-on="on">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Change Date</span>
                      </v-tooltip>
                    </div>
                    <h4>Website Views</h4>
                    <span class="subtitle">Last Campaign Performance</span>
                    <v-divider></v-divider>
                    <v-icon>mdi-clock-outline</v-icon>
                    <span class="card-footer">updated 10 minutes ago</span>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="chart-container">
                    <v-sparkline
                        :value="value"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        class="chart elevation-6 sales-chart"
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #00cae3 !important;">
                            mdi-refresh
                          </v-icon>
                        </template>
                        <span>Refresh</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Change Date</span>
                      </v-tooltip>
                    </div>
                    <h4>Daily Sales</h4>
                    <v-icon class="arrow-up">mdi-arrow-up</v-icon>
                    <span class="sales-percent">55%</span>
                    <span class="subtitle">increase in today's sales</span>
                    <v-divider></v-divider>
                    <v-icon>mdi-clock-outline</v-icon>
                    <span class="card-footer">updated 4 minutes ago</span>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="chart-container">
                    <v-sparkline
                        :value="value"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        class="chart elevation-6 tasks-chart"
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #00cae3 !important;">
                            mdi-refresh
                          </v-icon>
                        </template>
                        <span>Refresh</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Change Date</span>
                      </v-tooltip>
                    </div>
                    <h4>Completed Tasks</h4>
                    <span class="subtitle">Last Last Campaign Performance</span>
                    <v-divider></v-divider>
                    <v-icon>mdi-clock-outline</v-icon>
                    <span class="card-footer">campaign sent 26 minutes ago</span>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row style="margin-top: 3rem">
              <v-col cols="12" sm="6" lg="3">
                <v-card class="pa-3">
                  <div class="info-container">
                    <div class="header">
                      <v-icon class="info-icon elevation-6 twitter">mdi-twitter</v-icon>
                      <div style="display: flex; flex-direction: column;">
                        <span>Followers</span>
                        <h3>+245</h3>
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <v-icon>mdi-clock</v-icon>
                      <span class="card-footer">Just Updated</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-card class="pa-3">
                  <div class="info-container">
                    <div class="header">
                      <v-icon class="info-icon elevation-6 poll">mdi-poll</v-icon>
                      <div style="display: flex; flex-direction: column;">
                        <span>Website Visits</span>
                        <h3>75.521</h3>
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <v-icon>mdi-tag</v-icon>
                      <span class="card-footer">Tracked from Google Analytics</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-card class="pa-3">
                  <div class="info-container">
                    <div class="header">
                      <v-icon class="info-icon elevation-6 store">mdi-store</v-icon>
                      <div style="display: flex; flex-direction: column;">
                        <span>Revenue</span>
                        <h3>$ 34,245</h3>
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <v-icon>mdi-calendar</v-icon>
                      <span class="card-footer">Last 24 Hours</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-card class="pa-3">
                  <div class="info-container">
                    <div class="header">
                      <v-icon class="info-icon elevation-6 sofa">mdi-sofa</v-icon>
                      <div style="display: flex; flex-direction: column;">
                        <span>Bookings</span>
                        <h3>184</h3>
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <v-icon style="color: #f44336!important">mdi-alert</v-icon>
                      <span class="card-footer">Get More Space...</span>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row style="margin-top: 2rem">
              <v-col cols="12">
                <span style="font-size: 25px; font-weight: 300 !important;">Manage Listings</span>
              </v-col>
            </v-row>
            <v-row style="margin-top: 4rem">
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="list-container">
                    <v-img src="./assets/img/card-2.jpg" class="card-img elevation-6"></v-img>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on">
                            mdi-view-split-vertical
                          </v-icon>
                        </template>
                        <span>View</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #4caf50 !important;">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #f44336 !important;">
                            mdi-close
                          </v-icon>
                        </template>
                        <span>Remove</span>
                      </v-tooltip>
                    </div>
                    <div class="card-body">
                      <h4>Cozy 5 Stars Apartment</h4>
                      <p>
                        The place is close to Barceloneta Beach and bus stop just 2 min by walk
                        and near to "Naviglio" where you can enjoy the life in Barcelona.
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <span class="price">$899/night</span>
                      <div>
                        <v-icon>mdi-map-marker</v-icon>
                        <span class="location">Barcelona, Spain</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="list-container">
                    <v-img src="./assets/img/card-3.jpg" class="card-img elevation-6"></v-img>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on">
                            mdi-view-split-vertical
                          </v-icon>
                        </template>
                        <span>View</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #4caf50 !important;">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #f44336 !important;">
                            mdi-close
                          </v-icon>
                        </template>
                        <span>Remove</span>
                      </v-tooltip>
                    </div>
                    <div class="card-body">
                      <h4>Office Studio</h4>
                      <p>
                        The place is close to Metro Station and bus stop just 2 min by walk
                        and near to "Naviglio" where you can enjoy the night life in London, UK.
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <span class="price">$1.119/night</span>
                      <div>
                        <v-icon>mdi-map-marker</v-icon>
                        <span class="location"> London, UK</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" lg="4">
                <v-card class="pa-3">
                  <div class="list-container">
                    <v-img src="./assets/img/card-1.jpg" class="card-img elevation-6"></v-img>
                    <div class="icons">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on">
                            mdi-view-split-vertical
                          </v-icon>
                        </template>
                        <span>View</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #4caf50 !important;">
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                              style="color: #f44336 !important;">
                            mdi-close
                          </v-icon>
                        </template>
                        <span>Remove</span>
                      </v-tooltip>
                    </div>
                    <div class="card-body">
                      <h4>Beautiful Castle</h4>
                      <p>
                        The place is close to Metro Station and bus stop just 2 min by walk
                        and near to "Naviglio" where you can enjoy the main night life in Milan.
                      </p>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-footer">
                      <span class="price">$459/night</span>
                      <div>
                        <v-icon>mdi-map-marker</v-icon>
                        <span class="location">Milan, Italy</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <template>
        <v-footer padless style="margin-top: 3rem">
          <v-container>
            <v-row>
              <v-col cols="12" style="padding: 0 !important;">
                <div style="display: flex; justify-content: space-between">
                  <v-col cols="6" class="footer-items">
                    <a href="#">CREATIVE TIM</a>
                    <a href="#">ABOUT US</a>
                    <a href="#">BLOG</a>
                    <a href="#">LICENSES</a>
<!--                    <v-row class="footer-item">
                      <v-col cols="3">
                        <a href="#">CREATIVE TIM</a>
                      </v-col>
                      <v-col cols="3">
                        <a href="#">ABOUT US</a>
                      </v-col>
                      <v-col cols="3">
                        <a href="#">BLOG</a>
                      </v-col>
                      <v-col cols="3">
                        <a href="#">LICENSES</a>
                      </v-col>
                    </v-row>-->
                  </v-col>
                  <v-col cols="6" class="copyright">
                    &#169; 2019, made with
                    <v-icon style="font-size: 18px !important; margin: 0 .25rem !important;">mdi-heart</v-icon>
                    by<a href="#" style="color: #9c27b0;margin: 0 .25rem !important;">Creative Tim</a> for a better web.
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar'
export default {
  name: 'App',

  components: {
    Navbar
  },

  data() {
    return {
      drawer: false,
      accountItems: [
        { title: 'Profile' },
        { title: 'Settings' },
        { title: 'Log Out' }
      ],
      bellItems: [
        { title: 'Mike John Responded to your email' },
        { title: 'You have 5 new tasks' },
        { title: 'You\'re now friends with Andrew' },
        { title: 'Another Notification' },
        { title: 'Another One' },
      ],
      headers: [
        { text: 'Flag', align: 'start', value: 'flagImage', },
        { text: 'countryName', value: 'countryName' },
        { text: 'salesAmount', value: 'salesAmount' },
        { text: 'salesPercent', value: 'salesPercent' }
      ],
      data: [
        { flagImage: './assets/img/US.png', countryName: 'USA', salesAmount: 2920, salesPercent: '42.82%' },
        { flagImage: './assets/img/DE.png', countryName: 'Germany', salesAmount: 1300, salesPercent: '19.06%' },
        { flagImage: './assets/img/AU.png', countryName: 'Australia', salesAmount: 760, salesPercent: '11.14%' },
        { flagImage: './assets/img/GB.png', countryName: 'United Kingdom', salesAmount: 690, salesPercent: '10.12%' },
        { flagImage: './assets/img/RO.png', countryName: 'Romania', salesAmount: 680, salesPercent: '10.80%' },
        { flagImage: './assets/img/BR.png', countryName: 'Brasil', salesAmount: 550, salesPercent: '8.06%' },
      ],
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
      weatherData: [],
      cityName: ''
    }
  },
  methods: {
    fullyShowSidebar() {
      this.drawer = !this.drawer;
    }
  },
  mounted() {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1cf42ed0792e1fa0d3bb813b6976955b')
    .then(res => {
      this.weatherData = res.data.weather[0];
      this.cityName = res.data.name;
      console.log(this.weatherData);
    })
    .catch(err => {
      console.log(err);
    })
  }
};
</script>

<style lang="scss">
@import "styles/variables.scss";
#app {
  background: $background;
}

a {
  text-decoration: none !important;
}

.v-toolbar {
  background: $background !important;
  height: 75px !important;
  flex: none !important;

  .v-toolbar-title {
    font-size: 1.25rem !important;
  }

  .v-toolbar__content {
    padding: 0 !important;
  }

  .sidebar-toggler {
    background: $white;
    margin: 0 .5rem 0 0 !important;

    &:before {
      background: transparent !important;
    }

    .v-icon {
      color: $gray !important;
    }

    .v-icon {
      font-size: 1.25rem !important;
    }
  }

  .buttons {
    margin-top: .5rem;

    .notification-btn.v-btn {
      box-shadow: none !important;
      background: $background !important;
      padding: 10px 15px !important;
      height: auto !important;

      &:before {
        background: transparent !important;
      }

      &:hover {
        background: #e6e6e6 !important;
      }

      .v-icon {
        font-size: 1.25rem !important;
      }
    }

    .v-badge {
      .v-badge__badge {
        font-size: 9px !important;
        padding: 5px 6px !important;
        border: 2px solid $white !important;
        display: flex;
        align-items: center;
      }
    }
  }

  .search-input {
    max-width: 100px !important;
    margin-top: 1.25rem !important;

    .v-label {
      font-size: .9rem;
      font-weight: 400;
      color: #d2d2d2 !important;
    }

    .primary--text {
      color: $purple-2!important;
    }

    .v-input__control {
      .v-input__slot {
        &:before {
          border-color: #d2d2d2 !important;
        }
      }
    }
  }

  .search-input.primary--text {
    color: $purple-2 !important;
    caret-color: $purple-2 !important;
  }

  .search-btn {
    background: $white;
    margin-right: 40px;

    &:before {
      background: transparent !important;
    }

    .v-icon {
      color: $gray !important;
    }

    .v-icon {
      font-size: 1.25rem !important;
    }
  }

  @media (max-width: 992px) {
    .toolbar-btn {
      display: none;
    }
  }
}

.v-list.btn-submenu {
  .v-list-item {
    padding: 0 .5rem !important;
    margin: 0 .5rem;
    min-height: 40px !important;

    &:hover {
      background: #9c27b0 !important;
      border-radius: 3px !important;
      box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),
                  0 12px 17px 2px rgba(0,0,0,.14),
                  0 5px 22px 4px rgba(0,0,0,.12)!important;

      .v-list-item__title {
        color: $white;
      }
    }

    .v-list-item__title {
      font-size: 13px !important;
    }
  }
}

.v-main {
   .world-map {
     .v-icon {
       padding: 28px;
       background: $green-2;
       color: $white;
       font-size: 2rem !important;
       border-radius: 4px;
       top: -30px !important;
     }

     span {
       font-size: 18px !important;
       font-weight: 300 !important;
       color: $text !important;
     }

     .v-data-table {
       td {
         font-size: .9rem !important;
         font-weight: 300 !important;
         color: $text !important;

         &:first-child {
           border-radius: 0 !important;
         }

         &:last-child {
           border-radius: 0 !important;
         }
       }
     }
   }

  .weather {
    .v-icon {
      padding: 28px;
      background: $blue-2;
      color: $white;
      font-size: 2rem !important;
      border-radius: 4px;
      top: -30px !important;
    }

    span {
      font-size: 18px !important;
      font-weight: 300 !important;
      color: $text !important;
    }

    .weather-icon.v-icon {
      top: 0 !important;
      background: transparent !important;
      color: $blue-2 !important;
      font-size: 65px !important;
      padding: 1rem !important;
    }

    .sunny.v-icon {
      color: $yellow-2;
    }
  }

  .chart-container {
    .chart {
      border-radius: 4px;
      position: relative;
      top: -30px !important;
      height: 185px !important;
      width: 100% !important;
      margin-bottom: -50px !important;
      z-index: 1;
      transition: .3s ease !important;
    }

    .views-chart {
      background: $pink-2;
    }

    .sales-chart {
      background: $green-2;
    }

    .tasks-chart {
      background: $blue-2;
    }

    &:hover {
      .chart {
        top: -60px !important;
      }
    }

    h4 {
      color: $text !important;
      font-size: 18px !important;
      font-weight: 300 !important;
      margin: 1rem 0 !important;
    }

    .subtitle {
      color: $gray !important;
      font-weight: 300 !important;
      font-size: 14px !important;
    }

    .v-icon {
      font-size: 16px !important;
      color: $gray!important;
      margin-right: .5rem !important;
    }

    .v-icon.arrow-up {
      font-size: 16px !important;
      color: $green-2 !important;
      margin-right: 0 !important;
    }

    .sales-percent {
      color: $green-2 !important;
      font-weight: 300 !important;
      font-size: 14px !important;
    }

    .card-footer {
      font-size: 12px !important;
      color: $gray !important;
    }

    .icons {
      display: flex;
      justify-content: center;
      align-items: center;

      .v-icon {
        margin: 0 .75rem !important;
        font-size: 18px !important;
      }
    }

    .v-divider {
      margin: 1rem 0 .5rem !important;
      border-color: $background !important;
      height: 0 !important;
    }
  }

  .info-container {
    .header {
      display: flex;
      justify-content: space-between;

      .info-icon {
        padding: 28px;
        color: $white;
        font-size: 2rem !important;
        border-radius: 4px;
        top: -30px !important;
      }

      .twitter {
        background: $blue-2;
      }

      .poll {
        background: $pink-2;
      }

      .store {
        background: $green-2;
      }

      .sofa {
        background: $orange-2;
      }

      span {
        font-weight: 300 !important;
        font-size: 14px !important;
        color: $gray !important;
        text-align: right !important;
      }

      h3 {
        color: $text !important;
        font-size: 1.5rem !important;
        font-weight: 300 !important;
        text-align: right !important;
      }
    }

    .card-footer {
      .v-icon {
        font-size: 16px !important;
        //color: $gray !important;
        margin-right: .5rem !important;
      }

      span {
        font-size: 12px !important;
        color: $gray !important;
      }
    }

    .v-divider {
      margin: .1rem 0 !important;
      border-color: $background !important;
      height: 0 !important;
    }
  }

  .list-container {
    .card-img {
      border-radius: 6px;
      position: relative;
      top: -30px !important;
      height: 185px !important;
      width: 100% !important;
      margin-bottom: -55px !important;
      z-index: 1;
      transition: .3s ease !important;
    }

    &:hover {
      .card-img {
        top: -65px !important;
      }
    }

    .icons {
      display: flex;
      justify-content: center;
      align-items: center;

      .v-icon {
        font-size: 18px !important;
        margin: 0 .75rem !important;
      }
    }

    .card-body {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      h4 {
        font-size: 18px !important;
        padding: .5rem 1rem !important;
        font-weight: 300 !important;
        color: $text !important;
      }

      p {
        font-weight: 300 !important;
        font-size: 1rem !important;
        color: $gray !important;
        text-align: center;
        padding: 0 1rem;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;

      .price {
        color: $gray;
        font-size: 18px;
        font-weight: 300;
      }

      .v-icon {
        font-size: 16px !important;
      }

      .location {
        font-size: 12px;
        color: $gray;
      }
    }

    .v-divider {
      margin: 1rem 0 .5rem !important;
      border-color: $background !important;
      height: 0 !important;
    }
  }

  .footer-items {
    display: flex;
    align-items: center;
    //justify-content: space-around;

    a {
      color: $text !important;
      font-size: 12px;
      font-weight: 500 !important;
      margin: 0 1rem;
    }
  }

  .copyright {
    text-align: right;
    font-weight: 300 !important;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>