<!-- =========================================================================================
  File Name: Profile.vue
  Description: Profile Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="profile-page">

    <!-- PROFILE HEADER -->
    <div class="profile-header">
      <div class="relative">
        <div class="cover-container rounded-t-lg">
          <img :src="user_info.cover_img" alt="user-profile-cover" class="responsive block">
        </div>
        <div class="profile-img-container pointer-events-none">
          <div>
            <vs-avatar :src="user_info.profile_img" class="user-profile-img" size="85px"/>
          </div>
          <div class="profile-actions pointer-events-auto flex">
            <vs-button icon="icon-edit-2" icon-pack="feather" radius></vs-button>
            <vs-button class="ml-2 lg:ml-4" icon="icon-settings" icon-pack="feather" radius></vs-button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end flex-wrap profile-header-nav p-6">

        <div class="block sm:hidden">
          <feather-icon @click="isNavOpen = !isNavOpen" class="vx-navbar-toggler cursor-pointer" icon="AlignJustifyIcon"
                        v-show="!isNavOpen"/>
          <feather-icon @click="isNavOpen = !isNavOpen" class="vx-navbar-toggler cursor-pointer" icon="XIcon"
                        v-show="isNavOpen"/>
        </div>
        <div :class="isNavOpen ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div class="text-sm sm:flex-grow">
            <ul class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-3/4">
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">Timeline</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">About</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">Photos</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">Friends</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">Videos</router-link>
              </li>
              <li class="p-2 sm:p-0">
                <router-link to="/pages/profile">Events</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <vx-navbar> -->
      <!-- </vx-navbar> -->
    </div>

    <!-- COL AREA -->
    <div class="vx-row">
      <!-- COL 1 -->
      <div class="vx-col w-full lg:w-1/4">
        <!-- ABOUT CARD -->
        <vx-card class="mt-base" title="About">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <feather-icon icon="MoreHorizontalIcon"></feather-icon>
          </template>

          <!-- USER BIO -->
          <div class="user-bio">
            <p>Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.</p>
          </div>

          <!-- OTEHR DATA -->
          <div class="mt-5">
            <h6>Joined:</h6>
            <p>November 15, 2015</p>
          </div>

          <div class="mt-5">
            <h6>Lives:</h6>
            <p>New York, USA</p>
          </div>

          <div class="mt-5">
            <h6>Email:</h6>
            <p>bucketful@fiendhead.org</p>
          </div>

          <div class="mt-5">
            <h6>Website:</h6>
            <p>www.pixinvent.com</p>
          </div>

          <div class="social-links flex mt-4">
            <feather-icon class="mr-2" icon="FacebookIcon"
                          svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"></feather-icon>
            <feather-icon class="mr-2" icon="TwitterIcon"
                          svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"></feather-icon>
            <feather-icon class="mr-2" icon="InstagramIcon"
                          svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded"></feather-icon>
          </div>
        </vx-card>

        <!-- PAGES SUGGESTION -->
        <vx-card class="mt-base" title="Suggested Pages">
          <ul class="page-suggestions-list">
            <li :key="page.index" class="page-suggestion flex items-center mb-4" v-for="page in suggestedPages">
              <div class="mr-3">
                <vs-avatar :src="page.img" class="m-0" size="35px"/>
              </div>
              <div class="leading-tight">
                <p class="font-medium">{{ page.title | capitalize }}</p>
                <span class="text-xs">{{ page.type | capitalize }}</span>
              </div>
              <div class="ml-auto">
                <div class="flex">
                  <feather-icon class="mr-2 cursor-pointer" icon="StarIcon" svgClasses="h-4 w-4"></feather-icon>
                </div>
                <!-- <span class="flex bg-primary rounded p-2 text-white"><feather-icon icon="UserPlusIcon" svgClasses="w-4 h-4"></feather-icon></span> -->
              </div>
            </li>
          </ul>
        </vx-card>

        <!-- TWITER FEEDS -->
        <vx-card class="mt-base" title="Twitter Feeds">
          <ul class="twitter-feeds-list">
            <li :class="{'mt-8': index}" :key="feed.id" class="twitter-feed" v-for="(feed, index) in twitterFeeds">
              <!-- FEED HEADER -->
              <div class="twitter-feed-header flex items-center">
                <vs-avatar :src="feed.authorAvatar" class="m-0" size="35px"/>
                <div class="leading-tight ml-3">
                  <p class="feed-author font-semibold">{{ feed.authorDisplayName }}</p>
                  <span class="flex items-center"><small>@{{ feed.authorUsername }}</small><feather-icon class="ml-1"
                                                                                                         icon="CheckIcon"
                                                                                                         svgClasses="h-3 w-3 bg-primary rounded-full text-white"></feather-icon></span>
                </div>
              </div>

              <!-- FEED CONTENT -->
              <p class="mt-4">{{ feed.content }}</p>
              <div class="tags-container" v-if="feed.tags.length">
                <span :key="tag" class="mr-2 text-primary" id="tag" v-for="tag in feed.tags">#{{tag}}</span>
              </div>
              <small class="mt-3 inline-block">{{ feed.time | date(true) }}</small>
            </li>
          </ul>
        </vx-card>
      </div>

      <!-- COL 2 -->
      <div class="vx-col w-full lg:w-1/2">
        <vx-card :key="index" class="mt-base" v-for="(post, index) in userPosts">
          <div>
            <!-- POST HEADER -->
            <div class="post-header flex justify-between mb-4">
              <div class="flex items-center">
                <div>
                  <vs-avatar :src="userLatestPhotos[0]" class="m-0" size="45px"></vs-avatar>
                </div>
                <div class="ml-4">
                  <h6>{{ post.author }}</h6>
                  <small>{{ post.time | date(true) }} at {{ post.time | time }}</small>
                </div>
              </div>
              <div class="flex">
                <feather-icon :svgClasses="{'text-danger fill-current stroke-current': post.isLiked}" class="ml-4"
                              icon="HeartIcon"></feather-icon>
              </div>
            </div>

            <!-- POST CONTENT -->
            <div class="post-content">
              <p>{{ post.text }}</p>
            </div>
            <div class="post-media-container mb-6 mt-4">
              <ul class="flex post-media-list">
                <li :key="mediaIdex" class="post-media m-1 w-full" v-for="(media, mediaIdex) in post.media.slice(0, 2)">
                  <img :src="media.img" alt="user-upload" class="responsive rounded" v-if="mediaType(media) == 'image'">
                  <video-player :options="playerOptions(media)" class="media-video-player" ref="player"
                                v-else-if="mediaType(media) == 'video'" v-once/>
                  <span class="text-lg text-primary" v-else>Unknown Media Type</span>
                </li>
              </ul>
              <span class="flex justify-end" v-if="post.media.length > 2">
                                <a class="inline-flex items-center text-sm" href=""><span>View All</span> <feather-icon
                                    :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
                                    svgClasses="h-4 w-4"></feather-icon></a>
                            </span>
            </div>

            <!-- POST ACTION DATA -->
            <div>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <feather-icon class="mr-2" icon="HeartIcon" svgClasses="h-5 w-5"></feather-icon>
                    <span>{{ post.likes }}</span></div>
                  <ul class="users-liked user-list ml-3 sm:ml-6">
                    <li :key="userIndex" v-for="(user, userIndex) in post.usersLiked">
                      <vx-tooltip :text="user.name" position="bottom">
                        <vs-avatar :src="user.img" class="border-2 border-white border-solid -m-1"
                                   size="30px"></vs-avatar>
                      </vx-tooltip>
                    </li>
                  </ul>
                  <small class="ml-2">+{{ post.likes - 5 }} more</small>
                </div>
                <div class="flex items-center">
                  <feather-icon class="mr-2" icon="MessageSquareIcon" svgClasses="h-5 w-5"></feather-icon>
                  <span>{{ post.comments }}</span></div>
              </div>
              <div class="comments-container mt-4">
                <ul class="user-comments-list">
                  <li :key="commentIndex" class="commented-user flex items-center mb-4"
                      v-for="(commentedUser, commentIndex) in post.usersCommented.slice(0, 2)">
                    <div class="mr-3">
                      <vs-avatar :src="commentedUser.img" class="m-0" size="30px"/>
                    </div>
                    <div class="leading-tight">
                      <p class="font-medium">{{ commentedUser.author }}</p>
                      <span class="text-xs">{{ commentedUser.comment }}</span>
                    </div>
                    <div class="ml-auto">
                      <div class="flex">
                        <feather-icon class="mr-2 cursor-pointer" icon="HeartIcon" svgClasses="h-4 w-4"></feather-icon>
                        <feather-icon class="cursor-pointer" icon="MessageSquareIcon"
                                      svgClasses="h-4 w-4"></feather-icon>
                      </div>
                    </div>
                  </li>
                </ul>
                <span class="flex justify-end" v-if="post.usersCommented.length > 2">
                                    <a class="inline-flex items-center text-sm" href=""><span>View All</span> <feather-icon
                                        :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
                                        svgClasses="h-4 w-4"></feather-icon></a>
                                </span>
              </div>
              <div class="post-comment">
                <vs-textarea class="mb-2" label="Add Comment" v-model="post.commentbox"/>
                <vs-button size="small">Post Comment</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </div>

      <!-- COL 3 -->
      <div class="vx-col w-full lg:w-1/4">

        <!-- LATEST PHOTOS -->
        <vx-card class="mt-base" title="Latest Photos">
          <div class="vx-row pt-2">
            <div :key="index" class="vx-col w-1/2 sm:w-1/2 md:w-1/3 xl:1/4" v-for="(img, index) in userLatestPhotos">
              <img :src="img" alt="latest-upload" class="rounded mb-4 user-latest-image responsive">
            </div>
          </div>
        </vx-card>

        <vx-card class="mt-base" title="Suggestions">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <feather-icon icon="MoreHorizontalIcon"></feather-icon>
          </template>

          <!-- FRIENDS LIST -->
          <ul class="friend-suggesions-list">
            <li :key="index" class="friend-suggestion flex items-center mb-4"
                v-for="(friend, index) in suggestedFriends">
              <div class="mr-3">
                <vs-avatar :src="friend.avatar" class="m-0" size="35px"/>
              </div>
              <div class="leading-tight">
                <p class="font-medium">{{ friend.name }}</p>
                <span class="text-xs">{{ friend.mutualFriends }} Mutual Friends</span>
              </div>
              <div class="ml-auto cursor-pointer">
                <vs-button icon="icon-user-plus" icon-pack="feather" radius type="border"/>
              </div>
            </li>
          </ul>
          <template slot="footer">
            <vs-button class="w-full" icon="icon-plus" icon-pack="feather">Load More</vs-button>
          </template>
        </vx-card>

        <vx-card class="mt-base" title="Polls">
          <ul class="polls-list">
            <li :key="poll.id" class="poll" v-for="poll in polls">
              <h6 class="poll-title">{{ poll.title }}</h6>
              <ul class="poll-options-result">
                <li :key="option.value" class="poll-option mt-6" v-for="option in poll.options">
                  <div class="flex">
                    <vs-radio :vs-value="option.value" v-model="userPoll">{{ option.text | capitalize }}</vs-radio>
                    <span class="block ml-auto">{{ option.voted }}%</span>
                  </div>
                  <vs-progress :percent="option.voted"></vs-progress>
                  <ul class="users-voted user-list mt-2">
                    <li :key="userIndex" v-for="(user, userIndex) in option.usersVoted">
                      <vx-tooltip :text="user.name" position="bottom">
                        <vs-avatar :src="user.avatar" class="border-2 border-white border-solid -m-1"
                                   size="30px"></vs-avatar>
                      </vx-tooltip>
                    </li>
                  </ul>
                </li>
              </ul>
              <vs-button class="mt-5 w-full">Vote Now</vs-button>
            </li>
          </ul>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex justify-center mt-base">
          <vs-button @click="loadContent" class="vs-con-loading__container" id="button-load-more-posts">Load More
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {videoPlayer} from "vue-video-player";
    import "video.js/dist/video-js.css";

    export default {
        data() {
            return {
                isNavOpen: false,
                userPoll: "",
                user_info: {},
                mediaExtensions: {
                    img: ["jpg", "jpeg", "png", "bmp", "gif", "exif", "tiff"],
                    video: ["avi", "flv", "wmv", "mov", "mp4", "3gp"]
                },
                suggestedFriends: [],
                userLatestPhotos: [],
                userPosts: [
                    {
                        author: "Leeanna Alvord",
                        time: "Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)",
                        isLiked: true,
                        text: "I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.",
                        media: [],
                        likes: 145,
                        comments: 77,
                        usersLiked: [],
                        commentbox: "",
                        usersCommented: [
                            {
                                comment: "orthoplumbate morningtide naphthaline exarteritis",
                                author: "Kitty Allanson",
                                time: "Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)"
                            },
                            {
                                comment: "blockiness pandemy metaxylene speckle coppy",
                                author: "Jeanie Bulgrin",
                                time: "Mon Dec 10 2018 08:55:00 GMT+0000 (GMT)"
                            }
                        ]
                    },
                    {
                        author: "Leeanna Alvord",
                        time: "Mon Dec 11 2018 08:05:05 GMT+0000 (GMT)",
                        isLiked: false,
                        text: "Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake. Cupcake I love wafer cake. Halvah I love powder jelly I love cheesecake cotton candy tiramisu brownie.",
                        media: [{}],
                        likes: 276,
                        comments: 105,
                        usersLiked: [],
                        commentbox: "",
                        usersCommented: [
                            {
                                comment: "I love cupcake danish jujubes sweet.",
                                author: "Darcey Nooner",
                                time: "Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)"
                            },
                            {
                                comment: "Wafer I love brownie jelly bonbon tart apple pie",
                                author: "Lai Lewandowski",
                                time: "Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)"
                            }
                        ]
                    },
                    {
                        author: "Leeanna Alvord",
                        time: "Mon Dec 10 2018 12:05:05 GMT+0000 (GMT)",
                        isLiked: false,
                        text: "Wafer I love brownie jelly bonbon tart. Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.",
                        media: [{
                            sources: [{type: "video/mp4", src: "http://vjs.zencdn.net/v/oceans.mp4"}],
                            poster: "https://goo.gl/xcCsDd"
                        }],
                        likes: 269,
                        comments: 98,
                        usersLiked: [],
                        commentbox: "",
                        usersCommented: [
                            {
                                comment: "I love cupcake danish jujubes sweet.",
                                author: "Darcey Nooner",

                                time: "Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)"
                            },
                            {
                                comment: "Wafer I love brownie jelly bonbon tart apple pie",
                                author: "Lai Lewandowski",

                                time: "Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)"
                            }
                        ]
                    }
                ],
                suggestedPages: [],
                polls: [
                    {
                        id: 59,
                        title: "Who is the best actor in Marvel Cinematic Universe?",
                        options: [
                            {
                                text: "RDJ",
                                value: "rdj",
                                voted: 58,
                                usersVoted: []
                            },
                            {
                                text: "Chris Hemsworth",
                                value: "chris hemsworth",
                                voted: 16,
                                usersVoted: []
                            },
                            {
                                text: "mark ruffalo",
                                value: "mark ruffalo",
                                voted: 8,
                                usersVoted: [{name: "Lorelei Lacsamana"}]
                            },
                            {
                                text: "Chris Evans",
                                value: "chris evans",
                                voted: 16,
                                usersVoted: [
                                    {name: "Jeanie Bulgrin",},
                                    {name: "Graig Muckey",}
                                ]
                            }
                        ]

                    }
                ],
                twitterFeeds: [
                    {
                        authorUsername: "tiana59",
                        authorDisplayName: "Tiana Vercetti",
                        content: "I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups.",
                        tags: ["js", "vuejs"],
                        time: "Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)"
                    },
                    {
                        authorUsername: "tiana59",
                        authorDisplayName: "Tiana Vercetti",
                        content: "Carrot cake cake gummies I love I love tiramisu. Biscuit marzipan cookie lemon drops.",
                        tags: ["python"],
                        time: "Mon Dec 11 2018 01:05:05 GMT+0000 (GMT)"
                    },
                    {
                        authorUsername: "tiana59",
                        authorDisplayName: "Tiana Vercetti",
                        content: "I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups .",
                        tags: [],
                        time: "Mon Dec 10 2018 03:33:05 GMT+0000 (GMT)"
                    },
                    {
                        authorUsername: "tiana59",
                        authorDisplayName: "Tiana Vercetti",
                        content: "Muffin candy caramels. I love caramels tiramisu jelly. Pie I love wafer. Chocolate cake lollipop tootsie roll cake.",
                        tags: ["django", "vuejs"],
                        time: "Mon Dec 9 2018 08:47:05 GMT+0000 (GMT)"
                    }
                ],
                wasSidebarOpen: null
            };
        },
        computed: {
            mediaType() {
                return (media) => {
                    if (media.img) {
                        const ext = media.img.split(".").pop();
                        if (this.mediaExtensions.img.includes(ext)) return "image";
                    } else if (media.sources && media.poster) {
                        // other validations
                        return "video";
                    }
                };
            },
            playerOptions() {
                return (media) => {
                    return {
                        height: "360",
                        fluid: true,
                        autoplay: false,
                        muted: true,
                        language: "en",
                        playbackRates: [0.7, 1.0, 1.5, 2.0],
                        sources: media.sources,
                        poster: media.poster
                    };
                };
            }
        },
        methods: {
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#button-load-more-posts",
                    scale: 0.45
                });
                setTimeout(() => {
                    this.$vs.loading.close("#button-load-more-posts > .con-vs-loading");
                }, 3000);
            }
        },
        components: {
            videoPlayer
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit("TOGGLE_REDUCE_BUTTON", true);
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit("TOGGLE_REDUCE_BUTTON", false);
        }
    };

</script>


<style lang="scss">
  .profile-img-container {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -3.6rem;
    left: 10%;
    width: 80%;
    justify-content: space-between;
  }

  .user-profile-img {
    border: .3rem solid #fff;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.3);
  }

  .user-latest-image {
    transition: all .2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  .profile-header-nav {
    background-color: #fff;
  }
</style>
