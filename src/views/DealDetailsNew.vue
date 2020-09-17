<template>
  <div class="ph-2 pv-1">
    <div class="section-intro br-12 d-flex justify-between flex-wrap">
      <div class="deal-financials">
        <div class="text-semilight text-uppercase fs-085 fw-500 mb-4">Deal Title</div>
        <div class="text-dark fs-2 fw-500 lh-1 mt-025 mb-075 title">{{ deal.title }}</div>
      </div>
      <div class="location mt-05">
        <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">Location</div>
        <div class="text-semidark fs-15 fw-600" v-if="hasAccess">{{ deal.building.addres }}</div>
        <div class="text-semidark fs-15 fw-600" v-else>Private Address</div>
        <div
          class="text-semidark fw-500"
          v-text="
            hasAccess
              ? deal.building.city +
                ', ' +
                deal.building.state +
                ' ' +
                deal.building.zip
              : deal.building.city + ', ' + deal.building.state
          "
        ></div>
      </div>
      <div class="deal-summary mt-05">
        <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">Deal Summary</div>
        <div class="text-semidark fs-15 fw-600">
          {{ unitCount }}
          <span class>units</span>
        </div>
        <div class="text-semidark fs-15 fw-600">
          {{ totalSF.toLocaleString("en") }}
          <span class>sq ft</span>
        </div>

        <div
          class="text-semidark fs-15 fw-600"
          v-if="this.deal.building.rentalApproval"
        >Rental Income</div>
      </div>
      <div class="deal-number mt-05 d-flex flex-column align-end">
        <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">
          Deal ID
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="This Deal ID is a system generated number for each deal"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="text-semidark fs-15 fw-600 text-uppercase">BCD-{{ deal.id.substring(30) }}</div>
        <div
          @click="addToFavorites(deal.id)"
          class="text-semidark fw-500 mt-05 cursor-pointer"
          v-if="!this.$store.state.userObject.favorites.includes(deal.id)"
        >Add to favorites</div>
        <div
          @click="addToFavorites(deal.id)"
          class="text-semidark fw-500 mt-05 cursor-pointer"
          v-else
        >Remove from favorites</div>
        <button
          @click="offerPopup = true"
          class="btn mt-075 text-white bg-success"
          v-if="
            deal.privacy == 'Public' ||
              this.deal.userAccess.includes(this.$store.state.userObject.id) ||
              this.deal.owner == this.$store.state.userObject.id
          "
        >Submit Offer</button>
        <button
          v-else
          :disabled="
            this.$store.state.userObject.accessRequests != null &&
              this.$store.state.userObject.accessRequests.includes(
                this.$route.params.id
              )
          "
          @click="popupActive = true"
          class="btn mt-075 text-white bg-success"
          v-text="
            this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(
              this.$route.params.id
            )
              ? 'Access Pending'
              : 'Request Access'
          "
        ></button>
      </div>
    </div>
    <div class="section-map-and-cards br-12 d-flex justify-between mtop-1 flex-wrap">
      <!-- <img :key="mapUrl" :src="mapUrl" class="map-img" v-if="!hasAccess || (hasAccess && buildingImage == '')">
      <img :src="buildingImage" class="building-img" v-else>-->

      <!-- <VueSlickCarousel
          :asNavFor="$refs.thumbs"
          class="page-carousel carousel-main w-full"
          ref="main"
          v-bind="configCarousel.main"
          v-if="hasAccess"
        >
          <div :key="image" class="slide" v-for="image in this.dealImageLinks">
            <img :src="image" />
          </div>
          <div :key="image" class="slide" v-for="image in buildingCarouselImages">
            <img :src="image" />
          </div>
          <div :key="image" class="slide" v-for="image in this.images">
            <img :src="image" />
          </div>
          <div :key="video" class="slide" v-for="video in dealVideoLinks">
            <video controls="0" autoplay mute :src="video" />
          </div>
          <div :key="video" class="slide" v-for="video in this.buildingCarouselVideos">
            <video controls="0" autoplay mute :src="video" />
          </div>
          <div class="slide" :key="mapUrl">
            <img :src="mapUrl" />
          </div>
        </VueSlickCarousel>

        <VueSlickCarousel
          :asNavFor="$refs.main"
          class="page-carousel carousel-thumbnails w-full"
          ref="thumbs"
          v-bind="configCarousel.thumbnail"
          v-if="hasAccess"
        >
          <div :key="image" class="slide" v-for="image in this.dealImageLinks">
            <img :src="image" />
          </div>
          <div :key="image" class="slide" v-for="image in this.buildingCarouselImages">
            <img :src="image" />
          </div>
          <div :key="image" class="slide" v-for="image in this.images">
            <img :src="image" />
          </div>
          <div :key="video" class="slide" v-for="video in dealVideoLinks">
            <video :src="video" />
          </div>
          <div :key="video" class="slide" v-for="video in this.buildingCarouselVideos">
            <video :src="video" />
          </div>
          <div class="slide" :key="mapUrl">
            <img :src="mapUrl" />
          </div>
      </VueSlickCarousel>-->
      <div class="map">
        <swiper
          class="swiper"
          :options="swiperOption"
          v-if="this.dealImageLinks.length != 0 && hasAccess"
        >
          <swiper-slide v-for="image in this.dealImageLinks" :key="image">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + image + ');'"
            ></div>
            <!--<img class="responsive" :src="image" alt="banner"/> -->
          </swiper-slide>
          <swiper-slide v-for="video in this.dealVideoLinks" :key="video">
            <video autoplay mute loop class="responsive" :src="video"></video>
          </swiper-slide>
          <swiper-slide :key="mapUrl">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + mapUrl + ');'"
            ></div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
        <swiper
          class="swiper"
          :options="swiperOption"
          v-else-if="this.buildingCarouselImages.length != 0 && hasAccess"
        >
          <swiper-slide v-for="image in this.buildingCarouselImages" :key="image">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + image + ');'"
            ></div>
          </swiper-slide>
          <swiper-slide v-for="video in this.buildingCarouselVideos" :key="video">
            <video autoplay mute loop class="responsive" :src="video"></video>
          </swiper-slide>
          <swiper-slide :key="mapUrl">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + mapUrl + ');'"
            ></div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
        <swiper
          class="swiper"
          :options="swiperOption"
          v-else-if="this.images.length != 0 && hasAccess"
        >
          <swiper-slide v-for="image in this.images" :key="image">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + image + ');'"
            ></div>
          </swiper-slide>
          <swiper-slide :key="mapUrl">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + mapUrl + ');'"
            ></div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
        <swiper class="swiper" :options="swiperOption" v-else>
          <swiper-slide :key="mapUrl">
            <div
              class="w-full h-full bg-image-details"
              :style="'background-image: url(' + mapUrl + ');'"
            ></div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
      </div>
      <!-- <img :src="mapUrl" :key="mapUrl" v-if="!hasAccess" /> -->
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">Deal Financials</div>
        <div class="d-flex justify-between mtop-1">
          <div class="w-49">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Deal Asking Price
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="This is the discounted price being asked by the Seller"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.floor(dollarValuesInitial).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="w-49 d-flex flex-column align-end">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Market Price
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="This is the market or retail price of the units being offered in the deal"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>

            <div class="fs-15 fw-500 text-semidark">
              {{
              Math.round(marketPrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
        </div>
        <div class="w-100 d-flex justify-between mtop-1">
          <div class="w-49 d-flex flex-column align-start">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Deal Discount
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="This is the discount percentage based on the Deal Asking Price and Market Price"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-green">{{ Math.round(offerDiscountPercentage * 100) }}%</div>
          </div>

          <div class="w-49 d-flex flex-column align-end">
            <!-- <div class="text-semilight fs-125">{{totalSF.toLocaleString("en")}} sq ft</div> -->
            <div class="text-uppercase fs-085 fw-500 text-semilight">Deal Price / sq.f.t</div>
            <div class="text-semilight fs-125">
              {{
              Math.round(dollarValuesInitial / totalSF).toLocaleString(
              "en-US",
              {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              }
              )
              }}
              / sq ft
            </div>
          </div>
        </div>
        <div class="card-divider mtop-1 mbottom-1"></div>
        <div class="w-100 d-flex justify-between mtop-1">
          <div class="w-full d-flex justify-between">
            <div
              class="flex flex-col w-49"
              v-bind:class="overrideOfferAmount ? 'border-bottom' : ''"
            >
              <div class="text-uppercase fs-085 fw-500 text-semilight">
                Offer Amount
                <vx-tooltip
                  title
                  color="success"
                  class="inline"
                  text="This is your desired offer amount to view projected rates of return based on different purchase price scenarios"
                >
                  <span class="light-grey-circle">i</span>
                </vx-tooltip>
              </div>
              <div class="fs-2 fw-600 text-semidark" v-if="!overrideOfferAmount">
                {{
                Math.round(localDollarValues * 10000).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                })
                }}
              </div>
              <div class="fs-145 fw-600 text-semidark" v-if="overrideOfferAmount">
                <vs-input
                  class="border-none w-full"
                  v-model="offerAmountFormatted"
                  v-money="money"
                />
              </div>
            </div>

            <div class="d-f9lex flex-column align-end">
              <div class="text-semilight fs-085 text-uppercase">
                Offer $ / sq ft
                <vx-tooltip
                  title
                  color="success"
                  class="inline"
                  text="This is the computed price offered per square foot"
                >
                  <span class="light-grey-circle">i</span>
                </vx-tooltip>
              </div>
              <div class="text-semilight fs-125 mt-025">
                {{
                Math.round(purchaseSF).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                })
                }}
                / sq ft
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="text-uppercase fs-085 fw-500 text-semilight mt-075">Adjust Offer Amount <vx-tooltip
          title="Tooltip title"
          color="success"
          class="inline"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."><span class="light-grey-circle">i</span></vx-tooltip></div>-->
        <vs-checkbox class="mt-2 mb-2" v-model="overrideOfferAmount">Manual</vs-checkbox>

        <vue-slider
          ref="slider"
          :max="Math.round((dollarValuesInitial * 1.5) / 10000)"
          :min="Math.round((dollarValuesInitial * 0.5) / 10000)"
          v-model="localDollarValues"
          :disabled="overrideOfferAmount"
          v-bind="sliderOptions"
        ></vue-slider>

        <div class="text-uppercase fs-085 fw-500 text-semilight mt-075">
          Cash Down Payment
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="This is the amount of cash invested as the down payment"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="w-full flex justify-between fs-13">
          <div
            class="fw-600 text-semidark flex fs-13"
            v-bind:class="overrideDownPayment ? 'border-bottom' : ''"
          >
            <vs-input
              class="border-none w-full"
              v-model="bidAmountFormatted"
              v-money="money"
              v-if="overrideDownPayment"
            />
            <div class="text-semilight mt-025" v-else>
              {{
              Math.round(bidAmount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="fs-1 fw-500 text-semidark w-1/2 text-right">{{ downPayment.toFixed(2) }}%</div>
        </div>
        <vs-checkbox class="mt-2 mb-2" v-model="overrideDownPayment">Manual</vs-checkbox>

        <vue-slider
          ref="slider"
          :max="100"
          :min="0"
          v-model="downPayment"
          :disabled="overrideDownPayment"
          v-bind="sliderOptions"
        ></vue-slider>

        <!-- place it here -->

        <div class="card-divider mtop-1 mbottom-1"></div>

        <button
          @click="offerPopup = true"
          class="btn btn-green-small mt-075 text-semidark active text-uppercase fw-600 fs-125"
          style="margin-left: 1em;"
          v-if="
            deal.privacy == 'Public' ||
              this.deal.userAccess.includes(this.$store.state.userObject.id) ||
              this.deal.owner == this.$store.state.userObject.id
          "
        >Submit Offer</button>
        <!-- <button
          @click="offerPopup = true"
          class="btn btn-green-small mt-075 text-white bg-success"
          v-if="(deal.privacy == 'Public' || this.deal.userAccess.includes(this.$store.state.userObject.id)) && this.deal.owner != this.$store.state.userObject.id"
        >Submit Offer</button>-->
        <button
          v-else
          :disabled="
            this.$store.state.userObject.accessRequests != null &&
              this.$store.state.userObject.accessRequests.includes(
                this.$route.params.id
              )
          "
          @click="popupActive = true"
          class="btn btn-green-small mt-075 text-white bg-success"
          v-text="
            this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(
              this.$route.params.id
            )
              ? 'Access Pending'
              : 'Request Access'
          "
        ></button>
      </div>
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">Investment Returns</div>
        <div class="text-uppercase fs-085 fw-500 text-semilight mtop-1">
          Holding period
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Projected holding period for the investment"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="w-100 d-flex justify-between holding-period">
          <button
            :class="holdPeriod == 1 ? 'active' : ''"
            @click="holdPeriod = 1"
            class="btn mt-075 text-semidark"
          >1 Yrs</button>
          <button
            :class="holdPeriod == 3 ? 'active' : ''"
            @click="holdPeriod = 3"
            class="btn mt-075 text-semidark"
          >3 Yrs</button>
          <button
            :class="holdPeriod == 5 ? 'active' : ''"
            @click="holdPeriod = 5"
            class="btn mt-075 text-semidark"
          >5 Yrs</button>
          <button
            :class="holdPeriod == 10 ? 'active' : ''"
            @click="holdPeriod = 10"
            class="btn mt-075 text-semidark"
          >10 Yrs</button>
        </div>
        <div class="text-uppercase fs-085 fw-500 text-semilight mtop-1">
          Investment Type
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Easily switch between Appreciation and Rental to see the various return and financial metrics for the deals including NOI and cap rate"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="w-100 d-flex justify-between investment-type">
          <button class="btn mt-075 text-semidark active text-uppercase fw-600">Appreciation</button>
          <vx-tooltip
            text="Rental not available in this building."
            v-if="!deal.building.rentalApproval"
          >
            <button
              :class="investmentType == 1 ? 'active' : ''"
              @click="investmentType == 1 ? disableRental() : enableRental()"
              class="w-full btn mt-075 text-semidark text-uppercase fw-600"
              v-bind:style="deal.building.rentalApproval ? '' : 'opacity: 0.4'"
              :disabled="!deal.building.rentalApproval"
            >Rental Income</button>
          </vx-tooltip>

          <button
            :class="investmentType == 1 ? 'active' : ''"
            @click="investmentType == 1 ? disableRental() : enableRental()"
            class="btn mt-075 text-semidark text-uppercase fw-600"
            v-bind:style="deal.building.rentalApproval ? '' : 'opacity: 0.4'"
            v-else
          >Rental Income</button>
        </div>
        <div class="w-100 d-flex justify-between" style="margin-top: 1.5em">
          <div class="border-bottom w-70">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              {{ holdPeriod }}Yr sale price
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected sale price at the end of holding period"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.round(salePrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="border-bottom w-30">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Annual Appr.
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Project annual appreciation for the investments"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <vs-input
              class="fs-2 fw-600 text-semidark w-full border-none"
              v-model="projectedAppreciationFormatted"
              v-money="percentageAppreciation"
            ></vs-input>
            <!--            <div class="fs-2 fw-600 text-semidark">5%</div>-->
          </div>
        </div>
        <div class="w-100 d-flex justify-between" style="margin-top: 1.5em">
          <div class="w-70" v-if="investmentType == 1">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Rent
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected monthly rental income from all units in the deal"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.round(estRent / 12).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
              <span
                class="text-light thin-suffix"
              >/mo</span>
            </div>
          </div>
          <div class="w-30 border-bottom" v-if="investmentType == 1">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Occupancy
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected occupancy during the holding period"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <vs-input
              class="fs-2 fw-600 text-semidark w-full border-none"
              v-money="percentage"
              v-model="occupancyFormatted"
            ></vs-input>
            <!--            <div class="fs-2 fw-600 text-semidark">5%</div>-->
          </div>
        </div>
        <div class="w-100 d-flex justify-between mtop-1">
          <div class="w-70">
            <div
              class="text-uppercase fs-085 fw-500 text-semilight"
              v-text="noi > 0 ? 'Deal noi' : holdPeriod + ' Yr Carrying Costs'"
            >
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="All revenue from the property, less reasonable operating expenses. NOI excludes principal and interest payments on loans, capex, depreciation and ammortization."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Carrying costs are the costs the property owner pays while owning the property, including property taxes, insurance, mortgage payments and maintenance"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.round(noi).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="w-30">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Cap rate
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Cap Rate is the ratio of Net Operating Income to Property Value. It is a valuation measure, used to compare different real estate investments. A lower Cap Rate indicates a lower yield and potentially safer investment."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div
              class="fs-2 fw-600 text-semidark"
              v-if="this.investmentType == 1"
            >{{ (capRate * 100).toFixed(1) }}%</div>
            <div class="fs-2 fw-600 text-semidark" v-else>N/A</div>
          </div>
        </div>
        <div class="d-flex justify-between mtop-1">
          <div class="w-70">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Total return ($)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Total return is the rate of return of an investment over a holding period which includes income and appreciation"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-semidark">{{ totalReturn }}</div>
          </div>
          <div class="w-30">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Total return (%)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Total return is the rate of return of an investment over a holding period which includes income and appreciation represented as a %"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-green">{{ (totalReturnPercentage * 100).toFixed(1) }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-chart br-12 d-flex justify-between mt-5 flex-wrap" :key="offerDiscount">
      <div class="line-chart" :key="lineData.datasets[0].data[0]">
        <div class="title text-ultralight fs-125 fw-500">{{ holdPeriod }} Year Appreciation</div>
        <stacked-chart
          :chartdata="lineData"
          :key="lineData.datasets[2].data[0]"
          :options="optionsLines"
          class="w-full line-chart-size"
        ></stacked-chart>
      </div>
      <div class="donut-chart" :key="lineData.datasets[2].data[1]">
        <div class="title text-ultralight fs-125 fw-500">
          Return Distribution
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Shows the breakdown of the investment returns which includes, the gain from the discounted acquisition, holding period appreciation and rental income for the period"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <doughnut-chart
          :chartdata="chartData"
          :key="chartAppreciation"
          :options="options"
          class="w-full donut-chart-size"
          v-if="investmentType == 1"
        ></doughnut-chart>
        <doughnut-chart
          :chartdata="chartDataCut"
          :key="chartAppreciation"
          :options="options"
          class="w-full donut-chart-size"
          v-else
        ></doughnut-chart>
      </div>
      <div class="investments-returns">
        <div class="title text-ultralight fs-125 fw-500">Investment Returns</div>
        <div class="border-left border-left-green mtop-1">
          <div class="text-uppercase fs-085 fw-500 text-semilight">PRICE DISCOUNT TO MARKET</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            offerDiscount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
        </div>
        <div class="border-left border-left-blue mtop-1">
          <div
            class="text-uppercase fs-085 fw-500 text-semilight"
          >{{ holdPeriod }} YR PROJECTED APPRECIATION</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            allAppreciation.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
        </div>
        <div class="border-left border-left-yellow mtop-1">
          <div v-if="allCashFlow > 0" class="text-uppercase fs-085 fw-500 text-semilight">
            {{ holdPeriod }} YR Projected Rental NOI
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="All revenue from the property, less reasonable operating expenses. NOI excludes principal and interest payments on loans, capex, depreciation and ammortization."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div v-else class="text-uppercase fs-085 fw-500 text-semilight">
            {{ holdPeriod }} YR Carrying Cost
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Carrying costs are the costs the property owner pays while owning the property, including property taxes, insurance, mortgage payments and maintenance"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark" v-if="allCashFlow > 0">
            {{
            allCashFlow.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
          <div class="fs-2 fw-600 text-semidark" v-else>
            ({{
            Math.abs(allCashFlow).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }})
          </div>
        </div>
        <div class="card-divider mtop-1 mbottom-1" style="width: calc(100% + 20px + 2em);"></div>
        <div style="padding-left: 12px;">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Projected Return
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Total return is the rate of return of an investment over a holding period which includes income and appreciation"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-3 fw-600 text-semidark">{{ totalReturn }}</div>
        </div>
      </div>
    </div>
    <div class="section-cards br-12 d-flex justify-between mtop-1 flex-wrap">
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">Building Data</div>
        <div class style="margin-top: 1.5em">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Square Footage
            <vx-tooltip title color="success" class="inline" text="Total building square footage">
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div
            class="fs-2 fw-600 text-semidark"
          >{{ deal.building.buildingTotalSF.toLocaleString("en") }}</div>
        </div>

        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Sq Ft for sale
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Total Sq Ft for sale at the time of posting"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div
            class="fs-2 fw-600 text-semidark"
          >{{ deal.building.totalSfForSale.toLocaleString("en") }}</div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Market price of sq ft available
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Total sq.ft. available for sale multiplied by the market price per sq. ft."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            deal.building.totalSfValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
        </div>
        <div class="mt-075" v-if="deal.building.lastSaleDate != null">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Last unit sold on
            {{ deal.building.lastSaleDate.split("T")[0].split("-")[2] }}/{{
            deal.building.lastSaleDate.split("T")[0].split("-")[1]
            }}/{{ deal.building.lastSaleDate.split("T")[0].split("-")[0] }}
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="The price on the date of last known sale of a unit in the building at the time of posting"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            deal.building.lastSaleAmount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
        </div>
        <div class="mt-075" v-else>
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Last unit sold price
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="The price of the last known sale of a unit in the building at the time of posting"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">N/A</div>
        </div>

        <div class="mt-075" v-if="deal.building.lastSaleDate != null">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Last sold price / Sq Ft
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="The price per sq. ft. of the last known sale of a unit in the building at the time of posting"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (
            deal.building.lastSaleAmount / deal.building.lastSaleSF
            ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            })
            }}
            <span
              class="text-light fw-600 thin-suffix"
            >/ sq ft</span>
          </div>
        </div>
        <div class="mt-075" v-else>
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Last sold price / Sq Ft
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="The price per sq. ft. of the last known sale of a unit in the building at the time of posting"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">N/A</div>
        </div>
        <!-- <div
          class="mt-075"
          v-if="
            deal.building.historicalAppreciation != null &&
              deal.building.historicalAppreciation != ''">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Historical appreciation
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Estimated hisorical appreciation of units in the building, provided by the seller"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">{{ deal.building.historicalAppreciation }}%</div>
        </div>-->
        <!-- <div class="mt-075" v-else>
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Historical appreciation
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Estimated hisorical appreciation of units in the building, provided by the seller"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">N/A</div>
        </div>-->
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Units
            <vx-tooltip title color="success" class="inline" text="Total units in the building">
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">{{ deal.building.totalUnits.toLocaleString("en") }}</div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Floors
            <vx-tooltip title color="success" class="inline" text="Total floors in the building">
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">{{ deal.building.floors.toLocaleString("en") }}</div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Permitted Rental Period
            <vx-tooltip title color="success" class="inline" text="Total floors in the building">
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">N/A</div>
        </div>
      </div>
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">
          Annual Cashflow
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Net Operating Income for all units within the deal"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>

        <div class="w-100 d-flex justify-between" style="margin-top: 1.5em">
          <div class="w-70" style>
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Annual Rental Income
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected total rental income from all units in the deal, accounting for occupancy rate set above"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div v-if="investmentType == 1" class="fs-2 fw-600 text-semidark flex border-bottom">
              <vs-input class="border-none w-full" v-model="estRentFormatted" v-money="money" />
              <!--            <span class="text-light"> / yr</span>-->
            </div>
            <div v-else class="fs-2 fw-600 text-semidark">N/A</div>
          </div>
          <div class="w-30 border-bottom">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Occupancy
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected occupancy during the holding period"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>

            <div v-if="investmentType == 1" class>
              <vs-input
                class="fs-2 fw-600 text-semidark w-full border-none"
                v-money="percentage"
                :value="occupancyFormatted"
                disabled
              ></vs-input>
            </div>
            <div v-else class="fs-2 fw-600 text-semidark">N/A</div>
          </div>
        </div>

        <div class="card-divider mtop-1 mbottom-1" style="width: calc(100% + 20px + 2em);"></div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Annual Management / COA
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected annual property management for all the units in the deal"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark flex border-bottom">
            <vs-input
              class="border-none w-full"
              v-model="managementFormatted"
              v-money="moneyParentheses"
            />
            <!--            <span class="text-light"> / yr</span>-->
          </div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Annual Property Tax
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected annual property taxes for all the units in the deal"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark flex border-bottom">
            <vs-input
              class="border-none w-full"
              v-model="propertyTaxFormatted"
              v-money="moneyParentheses"
            />
            <!--            <span class="text-light"> / yr</span>-->
          </div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Annual Insurance
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected annual insurance costs for all the units in the deal"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark flex border-bottom">
            <vs-input
              class="border-none w-full"
              v-model="insuranceFormatted"
              v-money="moneyParentheses"
            />
            <!--            <span class="text-light"> / yr</span>-->
          </div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Annual Repairs
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected annual repair costs for all the units in the deal"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark flex border-bottom">
            <vs-input
              class="border-none w-full"
              v-model="repairsFormatted"
              v-money="moneyParentheses"
            />
            <!--            <span class="text-light"> / yr</span>-->
          </div>
        </div>
        <div class="card-divider mtop-1 mbottom-1" style="width: calc(100% + 20px + 2em);"></div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Total Operating Expenses
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected Total Operating Expenses excluding principal and interest payments on loans, capex, depreciation and ammortization"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            ({{
            totalOperatingExpenses.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }})
            <span
              class="text-light thin-suffix"
            >/ yr</span>
          </div>
        </div>
        <div
          v-if="noi > 0"
          class="card-divider mtop-1 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
        ></div>
        <div
          v-else
          class="card-divider mbottom-1 mtop-175"
          style="width: calc(100% + 20px + 2em); margin-top:0.7rem;"
        ></div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Net Operating Income
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="All revenue from the property, less reasonable operating expenses. NOI excludes principal and interest payments on loans, capex, depreciation and ammortization."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <!-- <div v-else class="text-uppercase fs-085 fw-500 text-semilight">
            Total Carrying Cost
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>-->
          <div class="fs-2 fw-600 text-semidark" v-if="noi > 0">
            {{
            Math.round(noi).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ yr</span>
          </div>
          <div class="fs-2 fw-600 text-semidark" v-else>N/A</div>
        </div>
        <div
          v-if="downPayment < 100"
          class="card-divider mbottom-1 mtop-175"
          style="width: calc(100% + 20px + 2em); margin-top:0.7rem;"
        ></div>
        <div class="mt-075" v-if="downPayment < 100">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Debt Service
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected principal and interest payments made on the financed amount of the property investment based on interest rate and mortgage term shown below"
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            ({{
            Math.abs(this.mortgage).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }})
            <span
              class="text-light thin-suffix"
            >/ yr</span>
          </div>
        </div>

        <div class="mt-075" v-if="downPayment < 100">
          <div class="w-100 d-flex justify-between" style>
            <div class="w-70" style>
              <div class="text-uppercase fs-085 fw-500 text-semilight">
                Interest Rate
                <vx-tooltip
                  title
                  color="success"
                  class="inline"
                  text="Projected mortgage interest rate to calculate debt service. Adjust interest rate based on your cost of capital"
                >
                  <span class="light-grey-circle">i</span>
                </vx-tooltip>
              </div>
              <div class="fs-2 fw-600 text-semidark flex border-bottom">
                <vs-input
                  class="border-none w-full"
                  v-model="interestRateFormatted"
                  v-money="percentageAppreciation"
                />
                <!--            <span class="text-light"> / yr</span>-->
              </div>
            </div>
            <div class="w-30 border-bottom">
              <div class="text-uppercase fs-085 fw-500 text-semilight">
                Mortgage Term
                <vx-tooltip
                  title
                  color="success"
                  class="inline"
                  text="Projected length of term on the financing in place for the financed amount"
                >
                  <span class="light-grey-circle">i</span>
                </vx-tooltip>
              </div>
              <vs-input class="fs-2 fw-600 text-semidark w-full border-none" v-model="term"></vs-input>
            </div>
          </div>
        </div>

        <div
          class="card-divider mtop-1 mbottom-1"
          style="width: calc(100% + 20px + 2em); margin-top:0.7rem;"
        ></div>
        <div class="mt-075">
          <div class="w-100 d-flex justify-between" style>
            <div class="w-70" style>
              <div class="text-uppercase fs-085 fw-500 text-semilight">
                Before Tax Cash Flow
                <vx-tooltip
                  title
                  color="success"
                  class="inline"
                  text="Projected cashflow after operating expenses and debt service"
                >
                  <span class="light-grey-circle">i</span>
                </vx-tooltip>
              </div>
              <div class="fs-2 fw-600 text-semidark" v-if="noi > 0">
                {{
                Math.round(beforeTaxCashflow).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                })
                }}
                <span
                  class="text-light thin-suffix"
                >/ yr</span>
              </div>
              <div class="fs-2 fw-600 text-semidark" v-else>
                ({{
                Math.round(Math.abs(noi)).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                })
                }})
                <span
                  class="text-light thin-suffix"
                >/ yr</span>
              </div>
            </div>
            <div class="w-30 border-bottom">
              <div class>
                <div class="text-uppercase fs-085 fw-500 text-semilight">
                  Cash on Cash (%)
                  <vx-tooltip
                    title
                    color="success"
                    class="inline"
                    text="Projected return showing before tax cash flow as a percentage of cash invested"
                  >
                    <span class="light-grey-circle">i</span>
                  </vx-tooltip>
                </div>
                <div
                  class="fs-175 fw-600 text-green"
                >{{ (beforeTaxCashflow/bidAmount * 100).toFixed(2) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">
          Per Sq. Ft. Analysis
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Projected per sq ft computation of financial information about the deal"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div style="margin-top: 1.5em">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Market Price</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (marketPrice / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Deal Asking Price</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (dollarValuesInitial / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>

        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Offer Price</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            Math.round(purchaseSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>
        <div
          class="card-divider mtop-175 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
          v-bind:style="noi > 0 ? 'margin-top: 0.7em' : 'margin-top: 0.7em'"
        ></div>

        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Carrying Cost</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (totalOperatingExpenses / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Rental Income</div>
          <div v-if="rentalIncome > 0" class="fs-2 fw-600 text-semidark">
            {{
            (rentalIncome / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
          <div v-else class="fs-2 fw-600 text-semidark">N/A</div>
        </div>
        <div
          class="card-divider mtop-175 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
          v-bind:style="noi > 0 ? 'margin-top: 0.7em' : 'margin-top: 0.7em'"
        ></div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">Projected Blended Sale Price</div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (salePrice / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>

        <div
          class="card-divider mtop-175 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
          v-bind:style="noi > 0 ? 'margin-top: 0.7em' : 'margin-top: 0.7em'"
        ></div>
        <div class="mt-075">
          <div class="text-uppercase fs-085 fw-500 text-semilight">
            Return On Investment
            <vx-tooltip
              title
              color="success"
              class="inline"
              text="Projected raturn on investment per sq ft including rental income and appreciation."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark">
            {{
            (totalReturnOnInvestment / totalSF).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            })
            }}
            <span
              class="text-light thin-suffix"
            >/ sq ft</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title text-ultralight fs-125 fw-500">
          {{ holdPeriod }} Year Investment Return
          <vx-tooltip
            title
            color="success"
            class="inline"
            text="Investment return for all units in the deal based on appreciation and rental income"
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="w-100 d-flex flex-column justify-between mt-075">
          <div class="mt-15" style>
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Purchase Price
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected sale price of the deal units calculated with assumed appreciation"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.round(localDollarValues * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="mt-075" style>
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Exit Sale Price
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected sale price of the deal units calculated with assumed appreciation"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-2 fw-600 text-semidark">
              {{
              Math.round(salePrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
        </div>
        <div
          class="card-divider mtop-175 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
          v-bind:style="noi > 0 ? 'margin-top: 0.7em' : 'margin-top: 0.7em'"
        ></div>
        <div class="w-100 d-flex flex-column justify-between mt-075">
          <div class="border-bottom w-70">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Purchase Cap Rate
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Cap Rate is the ratio of Net Operating Income to Property Value based on the purchase price. It is a valuation measure, used to compare different real estate investments. A lower Cap Rate indicates a lower yield and potentially safer investment."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div
              class="fs-2 fw-600 text-semidark"
              v-if="this.investmentType == 1"
            >{{ (capRate * 100).toFixed(2) }}%</div>
            <div class="fs-2 fw-600 text-semidark" v-else>N/A</div>
          </div>
          <div class="border-bottom mt-075">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Exit Cap Rate
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Cap Rate is the ratio of Net Operating Income to Property Value based on the exit price. It is a valuation measure, used to compare different real estate investments. A lower Cap Rate indicates a lower yield and potentially safer investment."
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div
              class="fs-2 fw-600 text-semidark"
              v-if="this.investmentType == 1"
            >{{ (futureCapRate * 100).toFixed(2) }}%</div>
            <div class="fs-2 fw-600 text-semidark" v-else>N/A</div>
          </div>
        </div>
        <div
          class="card-divider mtop-175 mbottom-1"
          style="width: calc(100% + 20px + 2em);"
          v-bind:style="noi > 0 ? 'margin-top: 0.7em' : 'margin-top: 0.7em'"
        ></div>
        <div class="d-flex justify-between mtop-1">
          <div class="w-70">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Total return ($)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Total return is the rate of return of an investment over a holding period which includes income and appreciation"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-semidark">{{ totalReturn }}</div>
          </div>
          <div class="w-30">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Total return (%)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Total return is the rate of return of an investment over a holding period which includes income and appreciation represented as %"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-green">{{ (totalReturnPercentage * 100).toFixed(1) }}%</div>
          </div>
        </div>
        <div class="d-flex justify-between mtop-1">
          <div class="w-70">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Ann. return ($)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected annualized returns on the deal based on the holding period"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-semidark">
              {{
              (bidAmount * totalAnnualizedReturn).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              })
              }}
            </div>
          </div>
          <div class="w-30">
            <div class="text-uppercase fs-085 fw-500 text-semilight">
              Ann. return (%)
              <vx-tooltip
                title
                color="success"
                class="inline"
                text="Projected annualized returns on the deal based on the holding period represented as a %"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="fs-175 fw-600 text-green">{{ (totalAnnualizedReturn * 100).toFixed(2) }}%</div>
          </div>
        </div>
        <!-- <button
          class="btn w-100 fw-300 cursor-pointer drift-open-chat"
          style="margin-top: 2em; padding-top: 2.5em; padding-bottom: 2.5em;"
          @click="$drift.show()"
        >Need help? Click to chat</button>-->
      </div>
    </div>

    <div class="section-tabs br-12 d-flex justify-between xl:justify-start mtop-1 flex-wrap">
      <div class="info w-100 flex flex-column items-center justify-start" style="padding: 0 1.5em;">
        <div class="title text-ultralight fs-125 fw-500">Units in Deal</div>

        <div class="text-semidark fw-500 text-center" style="font-size: 6em;">{{ unitCount }}</div>
        <!-- <div class="text-semilight fs-125 mtop-1 text-center">
          Units in deal
        </div>-->
      </div>
      <unit-card
        :unit="quantity.unit"
        :quantity="quantity.quantity"
        :view="hasAccess"
        :mapUrl="mapUrl"
        v-for="quantity in deal.units.items"
        :key="quantity.id"
      ></unit-card>
    </div>
    <div class="section-info br-12 d-flex justify-between mtop-1 flex-wrap relative">
      <div
        class="absolute w-full h-full overlay flex items-center justify-center br-12"
        v-if="!hasAccess"
      >
        <vs-icon size="large" :icon="'https'" color="primary" />
      </div>
      <div class="building-information">
        <div class="title text-ultralight fs-125 fw-500">
          Building Information
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="d-flex justify-between flex-wrap">
          <div style="width: 45%" v-if="hasAccess">
            <div class="text-uppercase fs-085 fw-500 text-semilight mtop-2">Building Description</div>
            <div class="fs-1 text-semidark mt-05">{{ deal.building.description }}</div>
            <div class="text-uppercase fs-085 fw-500 text-semilight mtop-2">Building Developer</div>
            <div
              class="fs-1 text-semidark mt-05"
              v-if="
                (this.$store.state.userObject.accessRequests.includes(
                  this.$route.params.id
                ) &&
                  this.deal.userAccess.includes(
                    this.$store.state.userObject.id
                  )) ||
                  deal.privacy == 'Public'
              "
            >Private Information, Request Access</div>
            <div class="fs-1 text-semidark mt-05" v-else>{{ deal.building.developer }}</div>
          </div>
          <div style="width: 45%">
            <div class="text-uppercase fs-085 fw-500 text-semilight mtop-2">Building Amenities</div>
            <div
              class="fs-125 text-semidark mt-05"
              v-for="amenity in deal.building.amenities"
              :key="amenity"
            >{{ amenity }}</div>
            <div class="text-uppercase fs-085 fw-500 text-semilight mtop-2">Building Views</div>
            <div
              class="fs-125 text-semidark mt-05"
              v-for="view in deal.building.views"
              :key="view"
            >{{ view }}</div>
            <!--            <div class="fs-125 text-semidark mt-05 border-bottom" style="width: 75px; border-width: 2px">View All</div>-->
          </div>
        </div>
      </div>
      <div class="building-documents">
        <div class="title text-ultralight fs-125 fw-500">
          Building Documents
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div class="d-flex mtop-2" v-for="(floorPlan, index) in this.floorPlans" :key="floorPlan">
          <div style="width: 24px; height: 24px;">
            <vs-icon
              :icon="hasAccess != true ? 'lock' : 'picture_as_pdf'"
              class="w-full h-full"
              color="primary"
              size="small"
            ></vs-icon>
          </div>
          <div
            @click="viewPDF(floorPlan)"
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-if="hasAccess"
          >Floor Plan {{ index + 1 }}</div>
          <div
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-else
          >Floor Plan {{ index + 1 }}</div>
        </div>
        <!--        <div class="d-flex mtop-1" v-if="deal.building.offeringMemorandum != null && deal.building.offeringMemorandum != ''">-->
        <!--        <div style="width: 24px; height: 24px; background: #eee;"></div>-->
        <!--        <div @click="viewPDF(buildingMemorandumLink)" class="fs-125 text-semidark cursor-pointer" style="margin-left: 8px;">Offering Memorandum</div>-->
        <!--        </div>-->
        <!--        {{buildingMemorandumLink}}-->
      </div>
      <div class="deal-documents">
        <div class="title text-ultralight fs-125 fw-500">
          Deal Documents
          <vx-tooltip
            title="Tooltip title"
            color="success"
            class="inline"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <span class="light-grey-circle">i</span>
          </vx-tooltip>
        </div>
        <div
          class="d-flex mtop-2"
          v-for="(memorandumLink, index) in this.memorandums"
          :key="memorandumLink"
        >
          <div style="width: 24px; height: 24px;">
            <vs-icon
              :icon="hasAccess != true ? 'lock' : 'picture_as_pdf'"
              class="w-full h-full"
              color="primary"
              size="small"
            ></vs-icon>
          </div>
          <div
            @click="viewPDF(memorandumLink)"
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-if="hasAccess"
          >Offering Memodandum {{ index + 1 }}</div>
          <div
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-else
          >Offering Memodandum {{ index + 1 }}</div>
        </div>
        <div class="d-flex mtop-2" v-for="(doc, index) in docLinks" :key="doc">
          <div style="width: 24px; height: 24px;">
            <vs-icon
              :icon="hasAccess != true ? 'lock' : 'picture_as_pdf'"
              class="w-full h-full"
              color="primary"
              size="small"
            ></vs-icon>
          </div>
          <div
            @click="viewPDF(doc)"
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-if="hasAccess"
          >Deal Document {{ index + 1 }}</div>
          <div
            class="fs-125 text-semidark cursor-pointer"
            style="margin-left: 8px;"
            v-else
          >Deal Document {{ index + 1 }}</div>
        </div>
      </div>
    </div>
    <!--    <div class="section-process br-12 d-flex justify-between mtop-1">-->
    <!--      <div class="byuer-process" style="width: 20%">-->
    <!--        <div class="title text-ultralight fs-125 fw-500">Buyer Process</div>-->
    <!--      </div>-->
    <!--      <div class="d-flex flex-column justify-between progress">-->
    <!--        <div class="d-flex justify-between mtop-2" style="padding-left: 2em; padding-right: 2em">-->
    <!--          <div class="d-flex flex-column">-->
    <!--            <div class="text-uppercase text-semidark fs-1 fw-400 text-center">Step 1</div>-->
    <!--            <div class="text-dark fs-15 fw-400 text-center">Get Verified</div>-->
    <!--          </div>-->
    <!--          <div class="d-flex flex-column">-->
    <!--            <div class="text-uppercase text-semidark fs-1 fw-400 text-center">Step 2</div>-->
    <!--            <div class="text-dark fs-15 fw-400 text-center">Analyze Deal</div>-->
    <!--          </div>-->
    <!--          <div class="d-flex flex-column">-->
    <!--            <div class="text-uppercase text-semidark fs-1 fw-400 text-center">Step 3</div>-->
    <!--            <div class="text-dark fs-15 fw-400 text-center">Request Access</div>-->
    <!--          </div>-->
    <!--          <div class="d-flex flex-column">-->
    <!--            <div class="text-uppercase text-semidark fs-1 fw-400 text-center">Step 4</div>-->
    <!--            <div class="text-dark fs-15 fw-400 text-center">Negotiate Acquisition</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="progress-bar">-->
    <!--          <div class="line-outer">-->
    <!--            <div class="line-inner"></div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="section-buttons br-12 d-flex justify-end mtop-1 align-center">
      <div class="text-semidark fs-15">
        Need some help analyzing the deal?
        <span
          style="border-bottom: 1px solid #333;"
          @click="$drift.show()"
        >Click to chat now</span>
      </div>
      <div class="flex flex-col mx-2">
        <button @click="assumptionsWait" class="btn fw-600">Save assumptions</button>
        <button
          @click="clearAssumptions"
          class="btn fw-600 mt-05"
          v-if="found == true || this.freshAssumption == true"
        >Clear assumptions</button>
      </div>
      <vs-prompt
        :active.sync="activePrompt"
        @accept="assumptionsWait"
        accept-text="Save"
        title="Edit Assumptions"
      >
        <div class="w-full">
          <p>Income</p>
          <div class="assumption-input w-full">
            <span>Rent</span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>$</span>
                </div>
              </template>

              <vs-input v-model="estRentFormatted" v-money="money" />
            </vx-input-group>
          </div>
          <div class="assumption-input w-full">
            <span>Estimated Vacancy</span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>%</span>
                </div>
              </template>

              <vs-input v-model="vacancy" />
            </vx-input-group>
          </div>
          <vs-divider></vs-divider>
          <div class="w-full flex justify-between items-center">
            <span>Expected Rent</span>
            <span class="value">
              {{
              expectedRent.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              })
              }}
            </span>
          </div>

          <p class="mt-1">Expenses</p>
          <div class="assumption-input w-full">
            <span>Property Tax</span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>$</span>
                </div>
              </template>

              <vs-input v-model="propertyTaxFormatted" v-money="money" />
            </vx-input-group>
          </div>
          <div class="assumption-input w-full">
            <span>
              Property
              <br />Management
            </span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>$</span>
                </div>
              </template>

              <vs-input v-model="managementFormatted" v-money="money" />
            </vx-input-group>
          </div>
          <div class="assumption-input w-full">
            <span>Repairs</span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>$</span>
                </div>
              </template>

              <vs-input v-model="repairsFormatted" v-money="money" />
            </vx-input-group>
          </div>
          <div class="assumption-input w-full">
            <span>Insurance</span>
            <vx-input-group class>
              <template slot="prepend">
                <div class="prepend-text bg-primary">
                  <span>$</span>
                </div>
              </template>

              <vs-input v-model="insuranceFormatted" v-money="money" />
            </vx-input-group>
          </div>
          <vs-divider></vs-divider>
          <div class="w-full flex justify-between items-center">
            <span>Expected Expenses</span>
            <span class="value">
              {{
              totalOperatingExpenses.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              })
              }}
            </span>
          </div>
        </div>
      </vs-prompt>
      <button
        @click="offerPopup = true"
        class="btn btn-green mt-075 text-semidark active text-uppercase fw-600 fs-125"
        style="margin-left: 1em;"
        v-if="
          deal.privacy == 'Public' ||
            this.deal.userAccess.includes(this.$store.state.userObject.id) ||
            this.deal.owner == this.$store.state.userObject.id
        "
      >Submit Offer</button>
      <button
        v-else
        :disabled="
          this.$store.state.userObject.accessRequests != null &&
            this.$store.state.userObject.accessRequests.includes(
              this.$route.params.id
            )
        "
        @click="popupActive = true"
        class="btn btn-green mt-075 text-semidark active text-uppercase fw-600 fs-125"
        style="margin-left: 1em;"
        v-text="
          this.$store.state.userObject.accessRequests != null &&
          this.$store.state.userObject.accessRequests.includes(
            this.$route.params.id
          )
            ? 'Access Pending'
            : 'Request Access'
        "
      ></button>
    </div>
    <vs-popup :active.sync="popupActive" class="agree-popup" title="Request access">
      <p class="text-semidark fs-15 fw-600 text-uppercase mb-4">{{ deal.title }}</p>
      <p class="text-semidark fs-15 fw-600 text-uppercase mb-4">
        {{
        Math.round(dollarValuesInitial).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        })
        }}
      </p>
      <p class="mb-4">
        Thank you for requesting access to the property details. In order to protect the privacy of the seller and to maintain the confidential and private nature of the listing, all potential buyers must complete a Non-Disclosure & Non-Circumvent Agreement prior to receiving access and viewing additional financial and ownership information.
        <br />
        <br />Privacy for sellers is a core feature of the marketplace and deal access is provided on a property by property basis. Please check the box below and we will email you a link to the appropriate document for execution in Docusign.
      </p>
      <p class="mb-4" v-if="terms">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, animi
        assumenda atque corporis cumque deserunt dolor doloremque, ducimus harum
        id labore laborum magni obcaecati praesentium, quasi suscipit voluptate
        voluptatibus voluptatum.
      </p>
      <div class="flex mb-4 items-center">
        <vs-checkbox v-model="agree">Send me the</vs-checkbox>
        <a
          href="/non-disclosure-non-circumvent"
          target="_blank"
          class="terms-text cursor-pointer"
        >Non-Disclosure & Non-Circumvent Agreement</a>
      </div>
      <form @submit.prevent="sendRequest">
        <vs-input type="text" :value="$route.params.id" name="dealId" class="hidden"></vs-input>
        <vs-input
          :value="this.$store.state.userObject.firstName"
          class="hidden"
          name="userFirstName"
        ></vs-input>
        <vs-input :value="this.$store.state.userObject.lastName" class="hidden" name="userLastName"></vs-input>
        <vs-input :value="this.$store.state.userObject.tel" class="hidden" name="userPhone"></vs-input>
        <vs-input :value="this.$store.state.userObject.email" class="hidden" name="userEmail"></vs-input>
        <vs-input :value="this.$store.state.userObject.username" class="hidden" name="username"></vs-input>
        <vs-input
          :value="this.$store.state.userObject.companyName"
          class="hidden"
          name="userCompanyName"
        ></vs-input>
        <vs-input
          type="text"
          :value="'www.BulkCondoDeals.com/deal-details/' + $route.params.id"
          name="dealLink"
          class="hidden"
        ></vs-input>
        <vs-input :value="this.deal.title" class="hidden" name="dealTitle"></vs-input>
        <vs-input
          :value="this.deal.building.addres + ', ' + this.deal.building.city + ', ' + this.deal.building.state"
          class="hidden"
          name="dealAddress"
        ></vs-input>
        <vs-input :value="seller.firstName" class="hidden" name="sellerFirstName"></vs-input>
        <vs-input :value="seller.lastName" class="hidden" name="sellerLastName"></vs-input>
        <vs-input :value="seller.tel" class="hidden" name="sellerPhone"></vs-input>
        <vs-input :value="seller.email" class="hidden" name="sellerEmail"></vs-input>
        <vs-input :value="seller.companyName" class="hidden" name="sellerCompanyName"></vs-input>
        <vs-button :disabled="!agree" color="primary" type="filled" button="submit">Request Access</vs-button>
      </form>
    </vs-popup>
    <vs-popup :active.sync="offerPopup" class="agree-popup" title="Submit Offer">
      <form @submit.prevent="sendEmail">
        <vs-input
          type="text"
          :value="
            Math.round(this.bidAmount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          "
          name="downPayment"
          class="hidden"
        ></vs-input>
        <vs-input type="text" :value="$route.params.id" name="dealId" class="hidden"></vs-input>
        <vs-input
          type="text"
          :value="'www.BulkCondoDeals.com/deal-details/' + $route.params.id"
          name="dealLink"
          class="hidden"
        ></vs-input>
        <vs-input
          type="text"
          :value="
            Math.round(this.localDollarValues * 10000).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            )
          "
          name="offerAmount"
          class="hidden"
        ></vs-input>
        <vs-input
          type="text"
          :value="this.$store.state.userObject.firstName"
          class="hidden"
          name="userFirstName"
        ></vs-input>
        <vs-input :value="this.$store.state.userObject.lastName" class="hidden" name="userLastName"></vs-input>
        <vs-input :value="this.$store.state.userObject.tel" class="hidden" name="userPhone"></vs-input>
        <vs-input :value="this.$store.state.userObject.email" class="hidden" name="userEmail"></vs-input>
        <vs-input :value="this.$store.state.userObject.username" class="hidden" name="username"></vs-input>
        <vs-input :value="this.deal.title" class="hidden" name="dealTitle"></vs-input>
        <vs-input
          :value="this.deal.building.addres + ', ' + this.deal.building.city + ', ' + this.deal.building.state"
          class="hidden"
          name="dealAddress"
        ></vs-input>
        <vs-input
          :value="this.$store.state.userObject.companyName"
          class="hidden"
          name="userCompanyName"
        ></vs-input>
        <vs-input :value="seller.firstName" class="hidden" name="sellerFirstName"></vs-input>
        <vs-input :value="seller.lastName" class="hidden" name="sellerLastName"></vs-input>
        <vs-input :value="seller.tel" class="hidden" name="sellerPhone"></vs-input>
        <vs-input :value="seller.email" class="hidden" name="sellerEmail"></vs-input>
        <vs-input :value="seller.companyName" class="hidden" name="sellerCompanyName"></vs-input>
        <div class="section-intro br-12 d-flex justify-between flex-col">
          <p class="mb-4">
            Thank you for submitting your offer. The offer is a non-binding
            expression of interest which does not obligate you to purchase the
            property. The offer provides the seller with an indication of the
            price you would be willing to pay for the asset, subject to due
            diligence, inspection and execution of definitive transaction
            documents.
            <br />
            <br />Due to exclusive terms and discounted pricing, deals sell fast. You
            offer is the first step towards securing this asset for your
            investment portfolio.
          </p>
          <div class="deal-number mt-05 d-flex flex-column align-start mb-075">
            <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">
              Deal ID
              <vx-tooltip
                title="DealID"
                color="success"
                class="inline"
                text="This Deal ID is a system generated number for each deal"
              >
                <span class="light-grey-circle">i</span>
              </vx-tooltip>
            </div>
            <div class="text-semidark fs-15 fw-600 text-uppercase">BCD-{{ deal.id.substring(30) }}</div>
          </div>
          <div class="deal-financials w-full" style="max-width:100%;">
            <div class="text-semilight text-uppercase fs-085 fw-500 mb-4">Deal Title</div>
            <div class="text-dark fs-2 fw-500 lh-1 mt-025 title">{{ deal.title }}</div>
          </div>
          <div class="location mt-05 w-full" tyle="max-width:100%;">
            <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">Location</div>
            <div class="text-semidark fs-15 fw-600" v-if="hasAccess">{{ deal.building.addres }}</div>
            <div class="text-semidark fs-15 fw-600" v-else>Private Address</div>
            <div
              class="text-semidark fw-500 mb-075"
              v-text="
                hasAccess
                  ? deal.building.city +
                    ', ' +
                    deal.building.state +
                    ' ' +
                    deal.building.zip
                  : deal.building.city + ', ' + deal.building.state
              "
            ></div>
          </div>
          <div class="deal-summary mt-05">
            <div class="text-semilight text-uppercase fs-085 fw-500 mb-2">Deal Summary</div>
            <div class="text-semidark fs-15 fw-600">
              {{ unitCount }}
              <span class>units</span>
              {{ totalSF.toLocaleString("en") }}
              <span class>sq ft</span>
            </div>
            <div class="text-semidark fs-15 fw-600"></div>

            <div
              class="text-semidark fs-15 fw-600 mb-2"
              v-if="this.deal.building.rentalApproval"
            >Rental Income</div>
          </div>
          <div class="text-uppercase fs-085 fw-500 text-semilight relative">
            Offer Amount
            <vx-tooltip
              title="Tooltip title"
              color="success"
              class="inline"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <span class="light-grey-circle">i</span>
            </vx-tooltip>
          </div>
          <div class="fs-2 fw-600 text-semidark mb-4">
            {{
            Math.round(localDollarValues * 10000).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            })
            }}
          </div>
          <!-- <p class="mb-4">
          Down Payment: {{
          Math.round(bidAmount).toLocaleString(
          'en-US',
          {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          }
          )}}
          </p>-->
          <p class="mb-4" v-if="termsOffer">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            animi assumenda atque corporis cumque deserunt dolor doloremque,
            ducimus harum id labore laborum magni obcaecati praesentium, quasi
            suscipit voluptate voluptatibus voluptatum.
          </p>
          <!-- <div class="flex mb-4 items-center">
            <vs-checkbox v-model="agreeOffer">I agree to the Non-Diclosure Terms</vs-checkbox>
          <span class="terms-text cursor-pointer" @click="termsOffer = !termsOffer">the terms</span>-->
          <!-- </div> -->
          <div class="flex mb-4 items-center">
            <vs-checkbox v-model="agreeOffer">
              Send me the
              <a
                target="_blank"
                href="/non-disclosure-non-circumvent"
              >Non-Disclosure and Non-Circumvent Agreement Terms</a>
            </vs-checkbox>
            <!-- <span class="terms-text cursor-pointer" @click="termsOffer = !termsOffer">the terms</span> -->
          </div>
          <vs-button
            :disabled="!agreeOffer"
            button="submit"
            color="primary"
            type="filled"
          >Submit offer</vs-button>
        </div>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import emailjs from "emailjs-com";
import VueSlider from "vue-slider-component";
import StarRating from "vue-dynamic-star-rating";
import { getDealNew } from "../graphql/custom-queries";
import { listLeads, getUser } from "../graphql/queries";
import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  createAccessRequest,
  createLead,
  createNotification,
  updateUser,
  deleteLead,
} from "../graphql/mutations";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import moment from "moment";
import pdf from "vue-pdf";
import { VMoney } from "v-money";
import Datepicker from "vuejs-datepicker";
import DoughnutChart from "../layouts/components/DoughnutChart.vue";
import StackedChart from "../layouts/components/StackedChart.vue";
import UnitCard from "../layouts/components/UnitCard.vue";
import "swiper/dist/css/swiper.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      offerPopup: false,
      terms: false,
      deal: {},
      totalSF: 0,
      from_now: 0,
      activePrompt: false,
      activePrompt2: false,
      rating: 4.7,
      count: 0,
      displayPDF: false,
      image_count: 0,
      images: [],
      buildingCarouselImages: [],
      title1: 0,
      favorites: [],
      rent: 1,
      investmentType: 2,
      estRent: 0,
      bidAmount: "",
      discount: "5000$",
      dollarValuesInitial: 0,
      localDollarValues: 0,
      downPayment: 60,
      holdPeriod: 0,
      vacancy: 0,
      loaded: false,
      starStyle: {
        fullStarColor: "#ed8a19",
        emptyStarColor: "#737373",
        starWidth: 15,
        starHeight: 15,
      },
      configCarousel: {
        main: {
          slidesToShow: 1,
          arrows: false,
          fade: true,
          lazyLoad: "progressive",
        },
        thumbnail: {
          slidesToShow: 12,
        },
      },
      memorandumLink: "",
      docLinks: [],
      interestRate: 0.0325,
      interestRateFormatted: "3.25%",
      term: 30,
      months: 60,
      moInterestRate: 0.0027,
      totalDebtService: 0,
      moPayment: 0,
      balanceAfter: 0,
      repairs: 0,
      management: 0,
      propertyTax: 0,
      insurance: 0,
      repairsFormatted: 0,
      managementFormatted: 0,
      propertyTaxFormatted: 0,
      insuranceFormatted: 0,
      operatingExpenses: 0,
      perMonthRentUnits: 0,
      projectedAppreciation: 5.0,
      projectedAppreciationFormatted: "5.00%",
      annualAppreciation: 0,
      marketPrice: 0,
      overrideBid: false,
      manualBid: 0,
      bufferInsurance: 0,
      bufferTax: 0,
      bufferManagement: 0,
      bufferRepairs: 0,
      buildingSF: "",
      totalValueSF: 0,
      personalInvestmentTarget: 0,
      customRent: 0,
      customRentFormatted: 0,
      popupActive: false,
      agree: false,
      saleSF: "",
      saleTotal: "",
      lastSale: "",
      insuranceFormBuffer: "",
      propertyTaxFormBuffer: "",
      managementFormBuffer: "",
      repairsFormBuffer: "",
      estRentFormatted: "",
      tradedFor: "",
      moment: "",
      found: false,
      lineChartNOI: [],
      lineChartDiscount: [],
      lineChartAppreciation: [],
      estRentBuffer: 0,
      leadObject: {},
      floorPlan: "",
      buildingMemorandumLink: "",
      money: {
        decimal: ".",
        thousands: ",",
        precision: 0,
        masked: false,
        prefix: "$",
      },
      moneyParentheses: {
        prefix: "($",
        suffix: ")",
        decimal: ".",
        thousands: ",",
        precision: 0,
        masked: false,
      },
      options: {
        tooltips: {
          mode: "label",
          callbacks: {
            label: function (tooltipItem, data) {
              var indice = tooltipItem.index;
              return (
                data.labels[indice] +
                ": " +
                data.datasets[0].data[indice].toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              );
            },
          },
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
        },
        elements: {
          arc: {
            borderWidth: 0, // <-- Set this to zero
            borderColor: "#333",
          },
        },
      },
      optionsLines: {
        legend: {
          display: false,
        },

        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += tooltipItem.yLabel.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
              return label;
            },
          },
        },
        responsive: true,

        maintainAspectRatio: false,
        // Can't just just `stacked: true` like the docs say
        scales: {
          yAxes: [
            {
              stacked: true,
            },
          ],
          xAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 20,
              },
            },
          ],
        },
        animation: {
          duration: 150,
        },
      },
      chartData: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#006f35", "#23c56c", "#8dff8d"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Discount", "Appreciation", "NOI"],
      },
      chartDataCut: {
        datasets: [
          {
            data: [10, 20],
            backgroundColor: ["#006f35", "#23c56c"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Discount", "Appreciation"],
      },
      lineChart: {
        discount: [],
        noi: [],
        appreciation: [],
      },
      lineData: {
        datasets: [
          {
            label: "Discount",
            fill: true,
            data: 1,
            backgroundColor: "#006f35",
          },
          {
            label: "Appreciation",
            fill: true,
            data: 1,
            backgroundColor: "#23c56c",
          },
          {
            label: "NOI",
            fill: true,
            data: 1,
            backgroundColor: "#8dff8d",
          },
        ],
        labels: ["1", "2", "NOI"],
      },
      mapUrl: "",
      buildingImage: "",
      occupancy: 100,
      occupancyFormatted: 100,
      percentage: {
        suffix: "%",
        precision: 0,
      },
      percentageAppreciation: {
        suffix: "%",
        precision: 2,
      },
      buildingCarouselVideos: [],
      dealImageLinks: [],
      dealVideoLinks: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          },
        },
      },
      floorPlans: [],
      memorandums: [],
      agreeOffer: false,
      termsOffer: false,
      bidAmountFormatted: "",
      overrideDownPayment: false,
      overrideOfferAmount: false,
      offerAmountFormatted: "",
      seller: {},
      sliderOptions: {
        dotSize: 14,
        width: "auto",
        height: 4,
        contained: false,
        direction: "ltr",
        data: null,
        dataLabel: "label",
        dataValue: "value",
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "active",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
      freshAssumption: false,
    };
  },
  components: {
    StarRating,
    VueSlickCarousel,
    pdf,
    Datepicker,
    DoughnutChart,
    StackedChart,
    UnitCard,
    swiper,
    swiperSlide,
    VueSlider,
  },
  directives: { money: VMoney, moneyParentheses: VMoney },
  methods: {
    async clearAssumptions() {
      let buffer = await API.graphql(
        graphqlOperation(listLeads, {
          limit: 1000,
          filter: {
            and: [
              { userId: { eq: this.$store.state.userObject.id } },
              { dealId: { eq: this.$route.params.id } },
            ],
          },
        })
      );
      console.log(buffer.data.listLeads);
      if (buffer.data.listLeads.items.length > 0) {
        this.$vs.loading({ background: "white" });
        await buffer.data.listLeads.items.forEach(async (assumption, index) => {
          let deleteInput = {
            id: assumption.id,
          };
          await API.graphql(
            graphqlOperation(deleteLead, { input: deleteInput })
          );
          if (index == buffer.data.listLeads.items.length - 1) {
            setTimeout(() => {
              // this.$vs.loading.close();
              this.$router.go(0);
            }, 200);
          }
        });
      }
      // this.$vs.loading.close();
    },
    async getSeller() {
      this.seller = await API.graphql(
        graphqlOperation(getUser, { id: this.deal.owner })
      );
      this.seller = this.seller.data.getUser;
      console.log(this.seller);
    },
    disableRental() {
      this.investmentType = 2;
      this.lineData.datasets[2].hidden = true;
    },
    enableRental() {
      this.investmentType = 1;
      this.lineData.datasets[2].hidden = false;
    },
    formUrl() {
      // let buffer_address = this.deal.building.addres;
      let buffer_city = this.deal.building.city;
      let buffer_state = this.deal.building.state;
      // buffer_address = buffer_address.replace(/ /g, "+");
      // buffer_address = buffer_address.replace(/\./g, "");
      buffer_city = buffer_city.replace(/ /g, "+");
      buffer_state = buffer_state.replace(/ /g, "+");
      // let buffer_zip = this.deal.building.zip;
      // buffer_zip = buffer_zip.replace(/ /g, "+");
      // console.log(buffer_address);
      // console.log(buffer_city);
      // console.log(buffer_state);
      this.mapUrl += "https://maps.googleapis.com/maps/api/staticmap?center=";
      this.mapUrl += buffer_city;
      this.mapUrl += ",";
      this.mapUrl += buffer_state;
      this.mapUrl +=
        "&zoom=10&size=650x450&scale=2&key=AIzaSyAnWJGsQaK0z0tQyLPKeuWHifPTmhR8zcI";
      //this.urlFormed = true;
      console.log("haha");
      console.log(this.mapUrl);
    },
    async saveAssumptions() {
      this.$vs.loading({ background: "white" });
      let leadInput = {};
      if (this.overrideBid == true) {
        leadInput.manualBid = true;
        leadInput.bidAmount = this.manualBid;
      }
      leadInput.downPayment = this.downPayment;
      leadInput.purchasePrice = this.localDollarValues * 10000;
      leadInput.customRent = this.estRent;
      leadInput.leadDealId = this.$route.params.id;
      leadInput.leadUserId = this.$store.state.userObject.id;
      //leadInput.bidAmount = this.bidAmount;
      leadInput.holdPeriod = this.holdPeriod;
      leadInput.investmentType = this.investmentType;
      leadInput.propertyTax = this.propertyTax;
      leadInput.management = this.management;
      leadInput.repairs = this.repairs;
      leadInput.insurance = this.insurance;
      leadInput.vacancy = this.vacancy;
      leadInput.dealId = this.$route.params.id;
      leadInput.userId = this.$store.state.userObject.id;
      leadInput.investmentTarget = this.personalInvestmentTarget;
      leadInput.appreciation = this.projectedAppreciation;
      // console.log(leadInput);
      await API.graphql(graphqlOperation(createLead, { input: leadInput }));
    },
    assumptionsWait() {
      this.saveAssumptions().then(() => {
        this.freshAssumption = true;
        this.$vs.loading.close();
      });
    },
    async checkLeads() {
      let buffer = await API.graphql(
        graphqlOperation(listLeads, {
          limit: 1000,
          filter: {
            and: [
              { userId: { eq: this.$store.state.userObject.id } },
              { dealId: { eq: this.$route.params.id } },
            ],
          },
        })
      );
      let leadsArray = [];
      //console.log(buffer);
      if (buffer.data.listLeads.items.length > 0) {
        ////console.log(buffer.data);
        this.found = true;
        leadsArray = buffer.data.listLeads.items;
        //console.log("LOL WHAT :)))")
        ////console.log(this.deal.updatedAt);
        leadsArray.sort(this.dynamicSort("-createdAt"));
        ////console.log(this.leadObject);
        this.leadObject = leadsArray[0];
        ////console.log(this.leadObject);
        ////console.log(leadsArray);
      }
    },
    follow() {
      this.checkLeads().then(() => {
        this.getDeal();
      });
    },
    clickOnSlide(index) {
      this.$refs.thumbs.goTo(index);
    },
    clickOnSlideVideo(index) {
      if (this.dealImageLinks.length > 0) {
        this.$refs.thumbs.goTo(index + this.dealImageLinks.length);
      } else if (this.buildingCarouselImages.length > 0) {
        this.$refs.thumbs.goTo(index + this.buildingCarouselImage.length);
      } else if (this.images.length > 0) {
        this.$refs.thumbs.goTo(index + this.images.length);
      }
    },
    clickOnMap() {
      if (this.dealImageLinks.length > 0) {
        if (this.dealVideoLinks.length > 0) {
          this.$refs.thumbs.goTo(
            this.dealImageLinks.length + this.dealVideoLinks.length
          );
        } else if (this.buildingCarouselVideos.length > 0) {
          this.$refs.thumbs.goTo(
            this.dealImageLinks.length + this.buildingCarouselVideos.length
          );
        }
      } else if (this.buildingCarouselImages.length > 0) {
        if (this.dealVideoLinks.length > 0) {
          this.$refs.thumbs.goTo(
            this.buildingCarouselImages.length + this.dealVideoLinks.length
          );
        } else if (this.buildingCarouselVideos.length > 0) {
          this.$refs.thumbs.goTo(
            this.buildingCarouselImages.length +
              this.buildingCarouselVideos.length
          );
        }
      } else if (this.images.length > 0) {
        if (this.dealVideoLinks.length > 0) {
          this.$refs.thumbs.goTo(
            this.images.length + this.dealVideoLinks.length
          );
        } else if (this.buildingCarouselVideos.length > 0) {
          this.$refs.thumbs.goTo(
            this.images.length + this.buildingCarouselVideos.length
          );
        }
      } else if (this.dealVideoLinks.length > 0) {
        this.$refs.thumbs.goTo(this.dealVideoLinks.length);
      } else if (this.buildingCarouselVideos.length > 0) {
        this.$refs.thumbs.goTo(this.buildingCarouselVideos.length);
      }
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = 0;
        if (property != "index")
          result =
            a[property].toString().toLowerCase() <
            b[property].toString().toLowerCase()
              ? -1
              : a[property].toString().toLowerCase() >
                b[property].toString().toLowerCase()
              ? 1
              : 0;
        else
          result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    viewPDF(link) {
      window.open(link);
    },
    async getDeal() {
      this.$vs.loading({ background: "white" });
      this.holdPeriod = 5;
      ////console.log(this.lineChart.discount);
      this.deal = await API.graphql(
        graphqlOperation(getDealNew, { id: this.$route.params.id })
      );
      console.log(this.deal);
      //console.log(this.deal);
      this.deal = this.deal.data.getDeal;
      this.loaded = true;
      console.log(this.deal);
      if (this.deal == null) {
        this.$vs.loading.close();
        this.$router.push("../../404");
      }
      this.lineChart.discount = new Array(60).fill(this.offerDiscount);
      this.lineData.datasets[0].data = this.lineChart.discount;
      ////console.log(this.lineChart.discount);
      if (this.deal.userAccess === null) {
        this.deal.userAccess = [];
      }
      let sf = 0;
      let mp = 0;
      let taxCalc = 0;
      let managementCalc = 0;
      let repairsCalc = 0;
      let insuranceCalc = 0;

      let imageLinks = [];

      this.estRent = this.deal.rentalAssumptions * 12;
      if (
        this.deal.rentalAssumptions % 1 == 0 ||
        (this.deal.rentalAssumptions * 10) % 1 == 0
      )
        this.estRentFormatted = this.deal.rentalAssumptions * 12;
      else this.estRentFormatted = this.deal.rentalAssumptions * 12;
      this.deal.unitNumbers.items.sort(this.dynamicSort("nickname"));
      this.deal.units.items.sort(this.dynamicSort("index"));
      this.deal.units.items.forEach((item, index) => {
        taxCalc += parseFloat(
          (item.unit.propertyTaxSF * item.quantity).toFixed(0)
        );
        ////console.log(taxCalc);
        repairsCalc += parseFloat(
          (item.unit.repairSF * item.quantity).toFixed(0)
        );
        insuranceCalc += parseFloat(
          (item.unit.insuranceSF * item.quantity).toFixed(0)
        );
        // console.log(123);
        // console.log((item.unit.managementSF * item.quantity).toFixed(2));
        // console.log(item.unit.managementSF);
        managementCalc += parseFloat(
          (item.unit.managementSF * item.quantity).toFixed(0)
        );
        console.log(managementCalc.toFixed(2));
        sf = sf + item.unit.squareFootage * item.quantity;
        ////console.log(sf);
        ////console.log("I'm counting");
        mp = mp + item.unit.price * item.quantity;
        if (item.unit.images.length > 0) {
          item.unit.images.forEach(function (item) {
            Storage.get(item).then((result) => {
              imageLinks.push(result);
            });
          });
          Storage.get(item.unit.images[0]).then((result) => {
            this.deal.units.items[index].unit.images[0] = result;
            this.image_count++;
          });
        }
      });
      ////console.log(this.propertyTax);
      let floorLink = "";
      if (
        this.deal.building.floorPlans != null &&
        this.deal.building.floorPlans.length > 0
      ) {
        let floorPlansArray = [];
        this.deal.building.floorPlans.forEach((item) => {
          Storage.get(item).then((result) => {
            floorPlansArray.push(result);
          });
        });
        this.floorPlans = floorPlansArray;
      }
      let buildingImages = [];
      if (
        this.deal.building.images != null &&
        this.deal.building.images.length > 0
      ) {
        this.deal.building.images.forEach((item) => {
          Storage.get(item).then((result) => {
            buildingImages.push(result);
          });
        });
      }
      let buildingVideos = [];
      if (
        this.deal.building.videos != null &&
        this.deal.building.videos.length > 0
      ) {
        this.deal.building.videos.forEach((item) => {
          Storage.get(item).then((result) => {
            buildingVideos.push(result);
          });
        });
      }
      let dealImages = [];
      if (this.deal.images != null && this.deal.images.length > 0) {
        this.deal.images.forEach((item) => {
          Storage.get(item).then((result) => {
            dealImages.push(result);
            console.log(dealImages);
          });
        });
      }
      let dealVideos = [];
      if (this.deal.videos != null && this.deal.videos.length > 0) {
        this.deal.videos.forEach((item) => {
          Storage.get(item).then((result) => {
            dealVideos.push(result);
            console.log(dealVideos);
          });
        });
      }
      if (this.deal.building.rentalApproval == true) {
        this.investmentType = 1;
      }
      // console.log(this.deal.building.offeringMemorandum);
      // if (this.deal.building.offeringMemorandum != null) {
      //     let getMemorandum = this.deal.building.offeringMemorandum;
      //     //////console.log(getLink);
      //     var resultLink = "";
      //     Storage.get(getMemorandum).then(result => {
      //         resultLink = result;
      //         this.buildingMemorandumLink = resultLink;
      //         console.log("Got it");
      //         console.log(result);
      //     });
      //     //////console.log(resultLink);
      //     //////console.log(this.memorandumLink);
      //     //////console.log("lol");
      // }
      if (
        this.deal.offeringMemorandum != null &&
        this.deal.offeringMemorandum.length > 0
      ) {
        let memorandumsArray = [];
        this.deal.offeringMemorandum.forEach((item) => {
          Storage.get(item).then((result) => {
            memorandumsArray.push(result);
          });
        });
        this.memorandums = memorandumsArray;
        //////console.log(resultLink);
        //////console.log(this.memorandumLink);
        //////console.log("lol");
      }
      if (this.deal.otherDocs != null && this.deal.otherDocs.length > 0) {
        let getLinks = this.deal.otherDocs;
        let readyLinks = [];
        getLinks.forEach(function (item) {
          Storage.get(item).then((result) => readyLinks.push(result));
        });
        //////console.log(readyLinks);
        this.docLinks = readyLinks;
        //////console.log(this.docLinks);
      }

      let dv = this.deal.dollarValues;
      this.dollarValuesInitial = dv.toFixed(0);
      //////console.log(typeof(this.dollarValuesInitial))
      this.localDollarValues = this.deal.dollarValues / 10000;
      this.offerAmountFormatted = this.deal.dollarValues;
      this.$vs.loading.close();
      this.totalSF = sf;
      ////console.log(this.totalSF);
      ////console.log("I'm total");
      this.marketPrice = mp;
      //////console.log(this.deal.createdDate);
      this.deal.createdDate = this.deal.createdDate.split(".").map(Number);
      //////console.log(this.deal.createdDate);
      this.moment = moment().format("YYYY.M.DD");
      this.moment = this.moment.split(".").map(Number);
      this.from_now = moment(this.deal.createdDate).diff(moment(this.moment));
      //////console.log(this.from_now);
      this.from_now = Math.round(-this.from_now / 86400000);
      //////console.log(this.from_now);

      this.propertyTax = taxCalc;
      this.repairs = repairsCalc;
      this.insurance = insuranceCalc;
      this.management = managementCalc;
      console.log(this.management);
      ////console.log(this.leadObject);
      if (this.found == true) {
        console.log(this.found);
        //console.log("HAHAHAHHAHA WTF");
        //console.log(this.leadObject);
        this.propertyTax = this.leadObject.propertyTax;
        this.repairs = this.leadObject.repairs;
        this.insurance = this.leadObject.insurance;
        this.management = this.leadObject.management;
        //console.log("LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLO")
        this.downPayment = this.leadObject.downPayment;
        this.localDollarValues = this.leadObject.purchasePrice / 10000;
        // this.investmentType = this.leadObject.investmentType;

        if (
          this.deal.building.rentalApproval == true &&
          this.leadObject.investmentType == 1
        ) {
          this.investmentType = this.leadObject.investmentType;
        } else if (this.leadObject.investmentType == 2) {
          this.investmentType = this.leadObject.investmentType;
        }
        this.holdPeriod = this.leadObject.holdPeriod;
        //this.overrideBid = this.leadObject.manualBid;
        // //this.manualBid = this.leadObject.offerAmount;
        this.vacancy = this.leadObject.vacancy;
        // this.vacancy = 100 - this.occupancy;
        this.estRentFormatted = this.leadObject.customRent;
        // this.estRent = this.leadObject.customRent;
        this.occupancyFormatted = 100 - this.vacancy;
        this.personalInvestmentTarget = this.leadObject.investmentTarget;
        this.projectedAppreciation = this.leadObject.appreciation;
        this.projectedAppreciationFormatted =
          this.leadObject.appreciation.toFixed(2) + "%";
        this.monthlyRateFormatted =
          (this.leadObject.monthlyRate * 100).toFixed(4) + "%";
        console.log("this.leadObject.monthlyRate", this.leadObject.monthlyRate);
        // if (this.leadObject.manualBid == true) {
        //     this.overrideBid = true;
        //     this.manualBid = this.leadObject.bidAmount;
        //     //console.log(this.manualBid);
        // }
      }
      if (this.insurance % 1 == 0 || (this.insurance * 10) % 1 == 0) {
        this.insuranceFormatted = this.insurance;
      } else this.insuranceFormatted = this.insurance;
      if (this.propertyTax % 1 == 0 || (this.propertyTax * 10) % 1 == 0) {
        this.propertyTaxFormatted = this.propertyTax;
      } else this.propertyTaxFormatted = this.propertyTax;
      if (
        this.managementFormatted % 1 == 0 ||
        (this.managementFormatted * 10) % 1 == 0
      ) {
        this.managementFormatted = this.management;
      } else this.managementFormatted = this.management;
      if (
        this.repairsFormatted % 1 == 0 ||
        (this.repairsFormatted * 10) % 1 == 0
      ) {
        this.repairsFormatted = this.repairs;
      } else this.repairsFormatted = this.repairs;
      console.log(this.deal.building.city);
      console.log(this.deal.building.state);
      console.log(this.deal.building.addres);
      this.formUrl();
      if (this.investmentType == 2) this.lineData.datasets[2].hidden = true;
      this.images = imageLinks;
      this.buildingCarouselImages = buildingImages;
      this.buildingCarouselVideos = buildingVideos;
      this.dealImageLinks = dealImages;
      this.dealVideoLinks = dealVideos;
      console.log(this.dealImageLinks);
      console.log(this.dealVideoLinks);
      // console.log(buildingImages);
      // this.images = this.images.concat(buildingImages);
      // console.log(imageLinks.concat)
      console.log(this.images);
      console.log(this.buildingCarouselImages);
      console.log(this.buildingCarouselVideos);
      this.getSeller();
    },
    async requestAccess() {
      let userName = "";
      if (
        this.$store.state.userObject.firstName &&
        this.$store.state.userObject.lastName
      )
        userName =
          this.$store.state.userObject.firstName +
          " " +
          this.$store.state.userObject.lastName;
      else userName = "John Doe";
      ////console.log(this.$store.state.userObject.firstName);
      let request = {
        user: this.$store.state.userObject.id,
        accessRequestDealId: this.$route.params.id,
        user_name: userName,
      };
      let check = await API.graphql(
        graphqlOperation(createAccessRequest, { input: request })
      );
      let updatedUser = {};
      updatedUser.id = this.$store.state.userObject.id;
      updatedUser.accessRequests = this.$store.state.userObject.accessRequests;
      //this.$store.commit("updateUserAccessRequests", this.$route.params.id);
      if (updatedUser.accessRequests === null) updatedUser.accessRequests = [];
      updatedUser.accessRequests.push(this.$route.params.id);
      ////console.log(this.$store.state.userObject.accessRequests);
      ////console.log(updatedUser);

      await API.graphql(graphqlOperation(updateUser, { input: updatedUser }));
      ////console.log(check);
      let notificationInput = {};
      notificationInput.notificationDealId = this.deal.id;
      notificationInput.notificationSenderId = this.$store.state.userObject.id;
      notificationInput.notificationUserId = this.deal.owner;
      notificationInput.type = 1;
      await API.graphql(
        graphqlOperation(createNotification, { input: notificationInput })
      );
      this.popupActive = false;
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Access request submitted",
      });
    },
    printLinks() {
      //////console.log(this.memorandumLink);
      //////console.log(this.docLinks);
      this.displayPDF = true;
    },
    viewBrochure(link) {
      window.open(link);
    },
    copyLink() {
      var dummy = document.createElement("input"),
        text = window.location.href;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.$vs.notify({
        color: "success",
        title: "Copied",
        text: "Link was copied to clipboard",
      });
    },
    async addToFavorites(id) {
      let currentFavorites = this.$store.state.userObject;
      if (currentFavorites.favorites == null) currentFavorites.favorites = [];
      let updateFavorites = {
        id: this.$store.state.currentUserID,
        favorites: [...currentFavorites.favorites],
      };
      if (updateFavorites.favorites.includes(id) === false) {
        updateFavorites.favorites.push(id);
        this.$store.commit("updateUserFav", id);
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
        this.$vs.notify({
          color: "success",
          title: "Saved",
          text: "Added to favorites successfully",
        });
      } else {
        updateFavorites.favorites = updateFavorites.favorites.filter(
          (item) => item !== id
        );
        this.$store.commit("deleteUserFav", id);
        this.$emit("unFav");
        await API.graphql(
          graphqlOperation(updateUser, { input: updateFavorites })
        );
        this.$vs.notify({
          color: "danger",
          title: "Unsaved",
          text: "Deleted from favorites successfully",
        });
      }
    },
    purchaseAssumptions() {
      this.activePrompt2 = true;
      this.bufferInsurance = this.insurance;
      this.bufferTax = this.propertyTax;
      this.bufferManagement = this.management;
      this.bufferRepairs = this.repairs;
    },
    rentExpAssumptions() {
      this.activePrompt = true;
      this.bufferInsurance = this.insurance;
      this.bufferTax = this.propertyTax;
      this.bufferManagement = this.management;
      this.bufferRepairs = this.repairs;
      this.estRentBuffer = this.estRent;
      this.insuranceFormBuffer = this.insuranceFormatted;
      this.propertyTaxFormBuffer = this.propertyTaxFormatted;
      this.managementFormBuffer = this.managementFormatted;
      this.repairsFormBuffer = this.repairsFormatted;
    },
    async sendEmail(e) {
      await emailjs
        .sendForm("gmail", "offer", e.target, "user_praLRxgpKucwmV0r1B3O4")
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      this.offerPopup = false;
      this.$vs.notify({
        color: "success",
        title: "Offer Submitted",
        text: "Offer submited! We will contact you shortly",
        position: "top-center",
      });
    },
    async sendRequest(e) {
      await emailjs
        .sendForm(
          "gmail",
          "access_request",
          e.target,
          "user_praLRxgpKucwmV0r1B3O4"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      this.requestAccess();
      // this.popupActive = false;
      this.$vs.notify({
        color: "success",
        title: "Access requested",
        text: "Access requested!",
        position: "top-center",
      });
    },
  },
  watch: {
    term: function () {
      console.log(this.term);
      console.log(this.loanTerm);
    },
    interestRateFormatted: function () {
      let buffer = this.interestRateFormatted;
      buffer = buffer.replace(/,/g, "");
      buffer = parseFloat(buffer);
      if (buffer > 100) this.interestRate = 1;
      else if (buffer < 0) this.interestRate = 0;
      else this.interestRate = buffer / 100;
    },
    projectedAppreciationFormatted: function () {
      let buffer = this.projectedAppreciationFormatted;
      buffer = buffer.replace(/,/g, "");
      buffer = parseFloat(buffer);
      if (buffer > 100) this.projectedAppreciation = 100;
      else if (buffer < 0) this.projectedAppreciation = 0;
      else this.projectedAppreciation = buffer;
    },
    occupancyFormatted: function () {
      let buffer = this.occupancyFormatted;
      buffer = buffer.replace(/,/g, "");
      buffer = parseInt(buffer);
      console.log(buffer);
      if (buffer > 100) this.occupancy = 100;
      else if (buffer < 0) this.occupancy = 0;
      else this.occupancy = buffer;
      // if(buffer <= 100 && buffer >= 0) {this.occupancy = buffer;  console.log("Right"); }
      // if(buffer > 100){ this.occupancy = 100;}
      // if(buffer < 0) { this.occupancy = 0;}
    },
    occupancy: function () {
      this.vacancy = 100 - this.occupancy;
    },
    customRent: function () {
      //////console.log(this.customRent);
      let buffer = this.customRent;
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = parseFloat(buffer);

        this.customRentFormatted = buffer;
      }
      //////console.log(buffer);
    },
    estRentFormatted: function () {
      let buffer = this.estRentFormatted;
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = parseFloat(buffer);

        this.estRent = buffer;
      }
    },
    bidAmountFormatted: function () {
      let buffer = this.bidAmountFormatted;
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = parseFloat(buffer);

        this.bidAmount = buffer;
        // console.log(this.downPayment);
        this.downPayment = (buffer / (this.localDollarValues * 10000)) * 100;
        // console.log(this.downPayment);

        // console.log(buffer);
        // console.log(this.localDollarValues);
      }
    },
    offerAmountFormatted: function () {
      let buffer = this.offerAmountFormatted;
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = parseFloat(buffer);
        // console.log(this.downPayment);
        this.localDollarValues = buffer / 10000;
        // console.log(this.downPayment);

        // console.log(buffer);
        // console.log(this.localDollarValues);
      }
    },
    insuranceFormatted: function () {
      let buffer = this.insuranceFormatted;
      ////console.log(buffer);
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = buffer.replace(/[()]/g, "");

        buffer = parseFloat(buffer);

        this.insurance = buffer;
      }
      ////console.log(this.insurance);
    },
    propertyTaxFormatted: function () {
      let buffer = this.propertyTaxFormatted;
      ////console.log(buffer);
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = buffer.replace(/[()]/g, "");

        buffer = parseFloat(buffer);

        this.propertyTax = buffer;
      }
      ////console.log(this.propertyTax);
    },
    managementFormatted: function () {
      let buffer = this.managementFormatted;
      ////console.log(buffer);
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = buffer.replace(/[()]/g, "");

        buffer = parseFloat(buffer);

        this.management = buffer;
      }
      ////console.log(this.management);
    },
    repairsFormatted: function () {
      let buffer = this.repairsFormatted;
      ////console.log(buffer);
      if (typeof buffer != "number") {
        buffer = buffer.replace(/,/g, "");
        buffer = buffer.replace(/\$/g, "");
        buffer = buffer.replace(/[()]/g, "");

        buffer = parseFloat(buffer);

        this.repairs = buffer;
      }
      ////console.log(this.repairs);
    },
    downPayment: function () {
      this.deal.dollarValues = this.localDollarValues * 10000;
      this.bidAmount = (this.deal.dollarValues * this.downPayment) / 100;
      if (this.downPayment < 20) {
        this.downPayment = 20;
        //this.manualBid = this.deal.dollarValues * (this.downPayment / 100);
      }
      if (this.downPayment > 100) {
        this.downPayment = 100;
      }
      // console.log(1);
      // let buffer = this.bidAmountFormatted;
      // if (typeof buffer != "number") {
      //   buffer = buffer.replace(/,/g, "");
      //   buffer = buffer.replace(/\$/g, "");
      //   buffer = parseFloat(buffer);
      //   // console.log(buffer);
      //   // console.log(this.bidAmount);
      // }
      // this.bidAmountFormatted = "$" + this.bidAmount;
      // console.log(123);
    },
    localDollarValues: function () {
      this.deal.dollarValues = this.localDollarValues * 10000;
      if (!this.bidAmount) {
        this.bidAmount = (this.deal.dollarValues * this.downPayment) / 100;
        this.bidAmountFormatted = this.bidAmount;
      } else {
        let initialBid = this.bidAmount;
        this.downPayment = (initialBid / this.deal.dollarValues) * 100;
        this.bidAmount = initialBid;
        this.bidAmountFormatted = this.bidAmount;
      }
    },
    overrideBid: function () {
      if (this.overrideBid === false)
        this.manualBid = (this.deal.dollarValues * this.downPayment) / 100;
    },
    manualBid: function () {
      // this.deal.dollarValues = this.dollarValuesInitial;
      // this.downPayment = (this.manualBid / this.deal.dollarValues) * 100;
      // this.bidAmount = this.manualBid;
      // if (this.manualBid < this.dollarValuesInitial * 0.2) {
      //   //this.manualBid = this.dollarValuesInitial * 0.2;
      // }
      // if (
      //   this.manualBid > this.dollarValuesInitial &&
      //   this.manualBid < this.dollarValuesInitial * 2
      // ) {
      //   this.localDollarValues = this.manualBid / 100000;
      //   this.downPayment = 100;
      // }
      // if (this.manualBid >= this.dollarValuesInitial * 2) {
      //   //this.manualBid = this.dollarValuesInitial * 2;
      //   this.localDollarValues = (this.dollarValuesInitial * 2) / 100000;
      //   this.deal.dollarValues = this.dollarValuesInitial * 2;
      //   this.downPayment = 100;
      // }
      this.bidAmount = this.manualBid;
    },
    totalSF: function () {
      this.buildingSF = this.totalSF;
    },
    // investmentType: function () {
    //     if (this.investmentType === 2) this.rent = 1;
    //     if (this.investmentType === 1) {
    //         this.rent = 3;
    //         this.overrideBid = true;
    //     }
    // },
    bidAmount: function () {
      this.loanAmount;
      this.loanTerm;
      this.pMonths;
      this.monthlyRate;
      this.debtService;
      this.monthlyPayment;
      this.balanceAfterN;
    },
    noi: function () {
      this.chartData.datasets[0].data[2] = Math.floor(
        (this.noi / 12) * this.pMonths
      );
      this.lineData.datasets[0].data = new Array(this.pMonths).fill(
        this.offerDiscount
      );
      this.chartData.datasets[0].data[0] = Math.floor(this.offerDiscount);
      this.chartDataCut.datasets[0].data[0] = Math.floor(this.offerDiscount);
      this.lineChart.noi = [];
      this.lineChart.noi[0] = this.noi / 12;
      //////console.log(this.lineChart.noi[0]);
      for (let i = 1; i < this.pMonths; i++) {
        this.lineChart.noi.push(
          Math.floor(this.noi / 12 + this.lineChart.noi[i - 1])
        );
      }
      //0-discount 1-appr
      this.lineData.datasets[2].data = this.lineChart.noi;
      ////console.log(this.lineData.datasets[2].data);
    },
    pMonths: function () {
      this.chartData.datasets[0].data[2] = Math.floor(
        (this.noi / 12) * this.pMonths
      );
      if (this.loaded === true)
        this.lineChart.discount = new Array(60).fill(this.offerDiscount);
      this.lineData.labels = new Array(this.pMonths);
      this.lineData.datasets[0].data = new Array(this.pMonths).fill(
        this.offerDiscount
      );
      for (let i = 0; i < this.pMonths; i++) this.lineData.labels[i] = i + 1;
      ////console.log(this.lineData.discount);
    },
    chartAppreciation: function () {
      this.chartData.datasets[0].data[1] = Math.floor(this.chartAppreciation);
      this.chartDataCut.datasets[0].data[1] = Math.floor(
        this.chartAppreciation
      );
      this.lineChart.appreciation = [];
      for (let i = 0; i < this.pMonths; i++) {
        this.lineChart.appreciation.push(
          Math.floor(
            this.marketPrice *
              Math.pow(1 + this.projectedAppreciation / 100, (i + 1) / 12) -
              this.marketPrice
          )
        );
      }
      ////console.log(this.lineChart.appreciation);

      this.lineData.datasets[1].data = this.lineChart.appreciation;
    },
  },
  computed: {
    hasAccess() {
      return (
        this.deal.privacy === "Public" ||
        this.deal.userAccess.includes(this.$store.state.userObject.id) ||
        this.deal.owner === this.$store.state.userObject.id
      );
    },
    totalReturn() {
      return (this.allAppreciation + this.allCashFlow).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
    loanAmount() {
      //////console.log((this.deal.dollarValues - this.bidAmount).toLocaleString("en-US", {style: "currency", currency: "USD"}));
      return (this.deal.dollarValues - this.bidAmount).toFixed(2);
    },
    pMonths() {
      //////console.log(this.holdPeriod * 12);
      return this.holdPeriod * 12;
    },

    loanTerm() {
      return this.term * 12;
    },
    monthlyRate() {
      //  console.log(this.monthlyRate)
      return this.interestRate / 12;
    },
    yearlyRate() {
      return this.interestRate * 100 + "%";
    },

    debtService() {
      return (
        this.loanAmount *
        ((this.monthlyRate * Math.pow(1 + this.monthlyRate, this.loanTerm)) /
          (Math.pow(1 + this.monthlyRate, this.loanTerm) - 1)) *
        this.pMonths
      );
    },
    monthlyPayment() {
      //////console.log(this.loanAmount * ((this.monthlyRate * (1 + this.monthlyRate) * this.pMonths) / (((1 + this.monthlyRate) * this.pMonths) - 1)));
      return (
        this.loanAmount *
        ((this.monthlyRate * (1 + this.monthlyRate) * this.loanTerm) /
          ((1 + this.monthlyRate) * this.loanTerm - 1))
      );
    },
    balanceAfterN() {
      //////console.log(this.loanAmount * (Math.pow((1 + this.loanAmount), this.loanTerm) - ((Math.pow((1 + this.monthlyRate), this.pMonths)) / ((Math.pow((1 + this.monthlyRate), this.loanTerm)) - 1))))
      return (
        (this.loanAmount *
          (Math.pow(1 + this.monthlyRate, this.loanTerm) -
            Math.pow(1 + this.monthlyRate, this.pMonths))) /
        (Math.pow(1 + this.monthlyRate, this.loanTerm) - 1)
      );
    },
    mortgage() {
      return this.monthlyPayment * 12;
    },
    totalOperatingExpenses() {
      if (this.investmentType === 1)
        return (
          // this.mortgage +
          this.repairs + this.management + this.propertyTax + this.insurance
        );
      else
        return (
          // this.mortgage +
          this.repairs + this.management + this.propertyTax + this.insurance
        );
    },
    rentalIncome() {
      if (this.rent != 3) {
        if (this.expectedRent != this.deal.rentalAssumptions)
          if (this.investmentType === 1) return this.expectedRent;
          else return 0;
        else {
          if (this.investmentType === 1) return this.customRentFormatted * 12;
          else return 0;
        }
      } else {
        if (this.investmentType === 1) return this.customRentFormatted * 12;
        else return 0;
      }
    },
    noi() {
      console.log("rentalIncome", this.rentalIncome);
      console.log("totalOperatingExpenses", this.totalOperatingExpenses);
      return this.rentalIncome - this.totalOperatingExpenses;
    },
    capRate() {
      return (this.noi + this.mortgage) / this.deal.dollarValues;
    },
    beforeTaxCashflow() {
      return this.noi - this.mortgage;
    },
    purchaseDiscount() {
      return this.deal.discount / this.marketPrice;
    },
    moRentUnit() {
      return this.rentalIncome / this.unitCount / 12;
    },
    rentPerSF() {
      //////console.log(this.moRentUnit);
      //////console.log(this.totalSF / (this.unitCount))
      return this.moRentUnit / (this.totalSF / this.unitCount);
    },
    salePerSF() {
      return this.salePrice / this.totalSF;
    },
    purchaseSF() {
      return this.deal.dollarValues / this.totalSF;
    },
    salePrice() {
      return (
        this.marketPrice *
        Math.pow(1 + this.projectedAppreciation / 100, this.holdPeriod)
      );
    },
    futureCapRate() {
      return (this.noi + this.mortgage) / this.salePrice;
    },
    yearCashFlow() {
      return this.noi;
    },
    allCashFlow() {
      return this.noi * this.holdPeriod;
    },
    allAppreciation() {
      return this.salePrice - this.deal.dollarValues;
    },
    yearAppreciation() {
      return this.allAppreciation / this.holdPeriod;
    },
    totalReturnOnInvestment() {
      return this.allAppreciation + this.allCashFlow;
    },
    totalReturnWithPrincipal() {
      return this.totalReturnOnInvestment + this.bidAmount;
    },
    cashInvested() {
      return this.bidAmount;
    },
    gainOnSale() {
      return this.totalReturnOnInvestment;
    },
    yield() {
      return this.gainOnSale / this.cashInvested;
    },
    totalAnnualizedIncome() {
      return (
        Math.pow(
          this.totalReturnOnInvestment / this.bidAmount,
          1 / (this.pMonths / 12)
        ) - 1
      );
    },
    totalReturnIncomeWithoutNoi() {
      return this.rentalIncome * this.holdPeriod;
    },
    totalReturnPercentage() {
      return this.gainOnSale / this.bidAmount;
    },
    totalAnnualizedReturn() {
      return (
        Math.pow(
          this.totalReturnWithPrincipal / this.bidAmount,
          1 / (this.pMonths / 12)
        ) - 1
      );
    },
    expectedRent() {
      if (this.vacancy != 0)
        return this.estRent - this.estRent * (this.vacancy / 100);
      else return this.estRent * 1;
    },
    rentPerSfPerYear() {
      return this.rentalIncome / this.totalSF;
    },
    chartAppreciation() {
      return (
        this.marketPrice *
          Math.pow(1 + this.projectedAppreciation / 100, this.pMonths / 12) -
        this.marketPrice
      );
    },
    unitCount() {
      let counter = 0;
      this.deal.units.items.forEach((unit) => {
        counter += unit.quantity;
      });
      ////console.log(counter);
      return counter;
    },
    offerDiscountPercentage() {
      return this.offerDiscount / this.marketPrice;
    },
    offerDiscount() {
      return this.marketPrice - this.localDollarValues * 10000;
    },
  },
  beforeMount() {
    this.follow();
    //this.checkLeads();
    //this.getDeal();
  },
  mounted() {},
};
</script>

<style lang="scss">
.progress {
  width: 90%;
}

.flex-wrap {
  flex-wrap: wrap;
}

.text-white {
  color: #fff;
}

.text-center {
  text-align: center;
}

.border-bottom {
  border-bottom: 1px solid #eee;
}

.w-30 {
  width: 40%;
}

.w-70 {
  width: 58%;
}

.w-49 {
  width: 49%;
}

.w-100 {
  width: 100%;
}

.p-025 {
  padding: 0.25em;
}

.p-05 {
  padding: 0.5em;
}

.p-075 {
  padding: 0.75em;
}

.p-1 {
  padding: 1em;
}

.br-4 {
  border-radius: 4px;
}

.br-8 {
  border-radius: 8px;
}

.br-12 {
  border-radius: 8px;
}

.mt-025 {
  margin-top: 0.25em;
}

.mt-05 {
  margin-top: 0.5em;
}

.mt-075 {
  margin-top: 0.75em;
}

.mtop-1 {
  margin-top: 1em;
}
.mtop-175 {
  margin-top: calc(1.75em + 59px);
}
.mtop-2 {
  margin-top: 2em;
}

.mb-025 {
  margin-bottom: 0.25em;
}

.mb-05 {
  margin-bottom: 0.5em;
}

.mb-075 {
  margin-bottom: 0.75em;
}

.mbottom-1 {
  margin-bottom: 1em;
}

.lh-05 {
  line-height: 0.5em;
}

.lh-075 {
  line-height: 0.75em;
}

.lh-1 {
  line-height: 1em;
}

.text-uppercase {
  text-transform: uppercase;
}

.fs-025 {
  font-size: 0.25em;
}

.fs-05 {
  font-size: 0.5em;
}

.fs-075 {
  font-size: 0.75em;
}

.fs-085 {
  font-size: 0.75em;
}

.fs-1 {
  font-size: 1em;
}

.fs-115 {
  font-size: 1.15em;
}

.fs-125 {
  font-size: 1.25em;
}

.fs-13 {
  font-size: 1.3em;
}

.fs-145 {
  font-size: 1.45em;
}

.fs-15 {
  font-size: 1.5em;
}

.fs-165 {
  font-size: 1.65em;
}

.fs-175 {
  font-size: 1.75em;
}

.fs-2 {
  font-size: 1.7em;
}

.fs-3 {
  font-size: 2.2em;
}

.d-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.align-center {
  align-items: center;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.fw-300 {
  font-weight: 300;
}

.fw-400 {
  font-weight: 400;
}

.fw-500 {
  font-weight: 500;
}

.fw-600 {
  font-weight: 600;
}

.fw-700 {
  font-weight: 700;
}

.fw-800 {
  font-weight: 800;
}

.fw-900 {
  font-weight: 900;
}

.ph-2 {
  padding-top: 0.75em;
  padding-bottom: 0.75em;
}

.pv-1 {
  padding-left: 1em;
  padding-right: 1em;
}

.content-wrapper {
  background: #f0f0f0;
}

.content-wrapper .router-view {
  padding: 1%;
}

.text-green {
  color: #21b865;
}

.text-dark {
  color: #5b5b5b;
}

.text-semidark {
  color: #808184;
}

.text-semilight {
  color: #868686;
}

.text-light {
  color: #bfbebe;
}

.text-ultralight {
  color: #646464;
}

.btn {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 10px 12.5px;
  border: 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.btn-green {
  background: #28c76f !important;
  padding: 24px 18px;
  cursor: pointer;
}

.btn-green-small {
  background: #28c76f !important;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  margin-left: 0 !important;
}

.btn.active {
  background: #575757;
  color: #fff;
}

.btn:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.section-intro {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 23px 34px;
}

.section-content {
  width: 100%;
  height: 100%;
}

.title {
  font-family: "Khmer MN", Georgia, Times, serif;
  font-size: 2rem;
}

.section-intro .deal-financials {
  max-width: 27%;
}

.section-intro .deal-financials .title {
  font-family: "Khmer MN", Georgia, Times, serif;
  font-size: 2.8rem;
}

.section-map-and-cards {
  width: 100%;
}

.map {
  width: 49%;
  height: 550px;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  // overflow: hidden;

  // .map-img {
  //   width: 1600px;
  //   height: 900px;
  // }

  // .building-img {
  //   height: 100%;
  //   width: auto;
  // }
}

.card {
  width: 24.5%;
  background: #fff;
  padding: 1.55em 2.1em;
  border-radius: 8px;
}

.card-divider {
  width: calc(100% + 2em);
  margin-left: -1em;
  background: #eee;
  height: 4px;
}

.vs-slider--circle {
  background: #28c76f;
  border-color: #28c76f;
  top: -5px;
}

.vs-slider-line-one {
  background: #28c76f;
}

.vs-slider--circle-text {
  background: #28c76f;
}

.vs-slider {
  height: 8px;
}

.vue-slider {
  width: 100%;
  position: relative;
  left: 0;
  margin: 16px 0;
  display: block;
  min-width: 300px;
  z-index: 100;
}

.vue-slider-rail {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #f0f0f0;
  position: relative;
  cursor: pointer;
  border: 0;
  margin: 0;
  display: block;
}

.vue-slider-dot-handle {
  transform: translate(-50%, -50%);
  top: 7px;
  left: 50%;
  transition: left 0.5s ease 0s;
  background: #28c76f;
  border-color: #28c76f !important;
  width: 16px;
  height: 16px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  margin: 0;
  z-index: 200;
  border: 2px solid rgba(var(--vs-primary), 1);
}

.vue-slider-dot-handle:hover {
  width: 18px;
  height: 18px;
}

.vue-slider-dot-tooltip {
  display: none;
}

.vue-slider-process {
  background: #28c76f;
}

.holding-period button {
  width: 24%;
}

.investment-type button {
  width: 49%;
}

.investment-type .con-vs-tooltip {
  width: 49%;
}

.section-chart {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 36px 47px;
}

.section-chart > .line-chart {
  width: 49%;
  max-height: 365px;
}

.section-chart > .investments-returns {
  width: 24.5%;
  padding: 0em 1em;
}

.section-chart > .donut-chart {
  width: 24.5%;
  padding: 0em 1em;
  max-height: 365px;
}

.border-left {
  position: relative;
  padding-left: 12px;
}

.border-left::before {
  content: "";
  position: absolute;
  height: 80%;
  width: 2px;
  border: 1px solid #000;
  background: #000;
  border-radius: 12px;
  top: 5%;
  left: 0;
}

.border-left-yellow::before {
  border: 1px solid #8dff8d;
  background: #8dff8d;
}

.border-left-blue:before {
  border: 1px solid #23c56c;
  background: #23c56c;
}

.border-left-green:before {
  border: 1px solid #006f35;
  background: #006f35;
}

.section-cards {
  width: 100%;
}

.section-info .building-information {
  width: 49.5%;
  background: #fff;
  padding: 47px 47px;
  border-radius: 8px;
}

.section-info .building-documents {
  width: 24.5%;
  background: #fff;
  padding: 47px 47px;
  border-radius: 8px;
}

.section-info .deal-documents {
  width: 24.5%;
  background: #fff;
  padding: 47px 47px;
  border-radius: 8px;
}

.section-process {
  width: 100%;
  background: #fff;
  padding: 0.75em 1em;
}

.progress-bar {
  width: 100%;
  margin-top: 4em;
  margin-bottom: 2em;
}

.progress-bar > .line-outer {
  width: 100%;
  background: #eee;
  height: 20px;
  border-radius: 12px;
}

.progress-bar > .line-outer > .line-inner {
  width: 32%;
  background: #49a25a;
  height: 20px;
  border-radius: 12px;
}

.section-tabs {
  width: 100%;
  background: #fff;
  padding: 28px 8px;
}

.section-tabs .info {
  width: 24.5%;
}

.tabbed-card {
  width: 24.5%;
  border-radius: 12px;
}

.tabbed-card-header {
  background: #23577c;
  padding: 1em;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.tabbed-card-controls {
  background: #1e4e6d;
  padding: 0.5em 1em;
}

.tabbed-card-body {
  background: #3579b2;
  padding: 1em;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

@media only screen and (max-width: 1366px) {
  .section-map-and-cards .map {
    width: 100%;
    height: 500px;
    margin-bottom: 1em;
  }
  .section-map-and-cards .card {
    width: 49%;
  }
}

@media only screen and (max-width: 1200px) {
  .section-tabs .info {
    width: 100%;
    margin-bottom: 2em;
  }
  .section-tabs .tabbed-card {
    width: 32%;
  }
  .section-tabs .info .mtop-2 {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
  }
  .section-tabs .info .mtop-1 {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 991px) {
  .section-map-and-cards .map {
    height: 400px;
  }
  .section-tabs .tabbed-card {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 1em;
  }
  .section-cards .card {
    width: 49%;
    margin-bottom: 1em;
  }
  .section-info .building-information {
    width: 100%;
    margin-bottom: 1em;
  }
  .section-info .building-documents {
    width: 49%;
  }
  .section-info .deal-documents {
    width: 49%;
  }
  .section-process {
    flex-direction: column;

    .progress {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 768px) {
  .section-chart .line-chart {
    width: 100%;
    height: 300px;
    margin-bottom: 1em;
  }
  .section-chart .donut-chart {
    width: 49%;
  }
  .section-chart .investments-returns {
    width: 49%;
  }
}

@media only screen and (max-width: 700px) {
  .section-map-and-cards .map {
    height: 300px;
  }
  .section-intro > div {
    width: 49%;
  }
  .section-intro .location {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
  }
  .section-process {
    flex-direction: column;
  }
  .section-process > .d-flex {
    margin: 0 auto;
  }
  .section-process > .d-flex > .d-flex {
    flex-direction: column;
  }
  .section-process > .d-flex > .d-flex > div {
    margin-bottom: 1em;
  }
  .section-map-and-cards .card {
    width: 100%;
    margin-bottom: 1em;
  }
  .section-tabs .tabbed-card {
    width: 100%;
  }
}

@media only screen and (max-width: 616px) {
  .section-intro > div {
    width: 100%;
    max-width: 100% !important;
  }
  .section-cards .card {
    width: 100%;
  }
  .section-chart .donut-chart {
    width: 100%;
    height: 300px;
  }
  .section-chart .investments-returns {
    width: 100%;
  }
  .section-tabs .info .mtop-2 {
    width: 100%;
  }
  .section-tabs .info .mtop-1 {
    width: 100%;
  }
  .section-info .building-information > .d-flex > div {
    width: 100% !important;
  }
  .section-info .building-documents {
    width: 100%;
    margin-bottom: 1em;
  }
  .section-info .deal-documents {
    width: 100%;
  }
  .section-buttons {
    flex-direction: column;
  }
}

.agree-popup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.con-vs-popup .vs-popup--content {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vs-dialog-cancel-button {
  display: none;
}
.border-none {
  .vs-con-input {
    input {
      border: none !important;
      box-shadow: none !important;
      font-size: 1.1em !important;
      font-weight: 600 !important;
      color: #808184 !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      padding-top: 0.1em !important;
      padding-bottom: 0.1em !important;
    }
  }
}
.section-tabs:nth-child(2) {
  margin-left: 0 !important;
}
.terms-text {
  color: #49a25a;
}
.text-circle-slider {
  display: none !important;
}
.overlay {
  background-color: #f6f6f6;
  opacity: 0.9;
}
.carousel-main {
  .slide {
    height: 400px;
    //min-width: 700px;
    > img,
    > video {
      border-radius: 5px;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      width: 100%;
      cursor: grab;
    }
    @media (max-width: 769px) {
      height: 520px;
    }
  }
  margin-bottom: 3px;
  @media screen and (max-width: 769px) {
    margin-bottom: 0;
    height: 520px;
    .slide {
      height: 520px;
    }
  }
}
.carousel-thumbnails {
  overflow: hidden;
  .slick-slide {
    margin: 0 7px;
  }
  .slick-list {
    margin: 0 -7px;
  }
  .slick-track {
    display: flex;
  }
  .slide {
    overflow: hidden;
    border-radius: 3px;
    > img,
    > video {
      min-width: 150px;
      border-radius: inherit;
      max-width: 100%;
      max-height: 86px;
      object-fit: cover;
      object-position: center;
      height: 100%;
      cursor: grab;
    }
    @media screen and (max-width: 576px) {
      > img,
      > video {
        min-width: initial;
      }
    }
  }
  @media screen and (max-width: 769px) {
    display: none;
  }
}
.swiper-container {
  height: 100%;
}
.bg-image-details {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

span.light-grey-circle {
  background: #f3f3f3;
  padding: 1px 6px;
  margin-left: 2px;
  border-radius: 17px;
  font-weight: 600;
  font-size: 10px;
  color: #a9a9a9;
  cursor: pointer;
}

.line-chart-size {
  max-height: 264px;
}

.donut-chart-size {
  max-height: 264px;
}

.line-chart .title,
.donut-chart .title,
.investments-returns .title {
  margin-bottom: 35px;
}

.con-vs-tooltip.inline {
  position: absolute;
}

.thin-suffix {
  font-weight: 400;
  letter-spacing: 0px;
  font-size: 0.7em;
}
</style>
