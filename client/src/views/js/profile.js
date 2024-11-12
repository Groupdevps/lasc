export default {
  name  : 'Profile',
  data  : (vm) => ({
    info    : {
      image : "/images/profile-icon-blank-circle.png"
    },
    ref             : "profile",
    show            : {
      changePassword : false,
    }, 
    fields_password : [
      { 
        key  : "currentPassword",
        text : "currentPassword",
        type : "password", 
        cols : 12,
      },
      { 
        key  : "newPassword",
        text : "newPassword",
        type : "password", 
        cols : 12,
      },
      { 
        key  : "confirmPassword",
        text : "confirmPassword",
        type : "password", 
        cols : 12,
      },
    ],
    fields  : [
      { 
        key  : "username",
        text : "username",
        type : "text", 
        cols : 12,
      },
      { 
        key  : "name",
        text : "name",
        type : "text", 
        cols : 12,
        isDisabled  : true,
      },
      { 
        key  : "lastName",
        text : "lastname",
        type : "text", 
        cols : 12,
        isDisabled  : true,
      },
      { 
        key  : "email",
        text : "email",
        type : "email", 
        cols : 12,
        isDisabled  : true,
      },
      { 
        key  : "TypeIDId",
        text : "typeId",
        type : "select",
        global_list : "typeIds", 
        cols : 12,
        item_text  : "name",
        item_value : "id",
        isDisabled  : true,
      },
      { 
        key  : "numberId",
        text : "numberId",
        type : "number", 
        cols : 12,
        isDisabled  : true,
      },

      { 
        key  : "professional_card",
        text : "professional_card",
        type : "number", 
        cols : 12,
        isDisabled  : true,
      },
      { 
        key  : "role",
        text : "position",
        type : "text", 
        cols : 12,
        isDisabled  : true,
      },
    ],
    field_actions : [
      {
        key    : "change_password",
        action : "change_password",
        color  : "primary",
        text   : "change_password",
        class  : "mr-10",  
      },
      {
        key    : "update",
        action : "update",
        color  : "success",
        text   : "update",
        class  : "",  
      },
    ],
  }), // data

  created(){
    if (this.currentUser) {
      this.getProfile(this.currentUser);
    }
    let user = this.$store.getters["auth/user"];
    console.log("USER ", user);
    if (user) {
      this.info = { ...this.info, ...user };
    }
  }, // created
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }, // currentUser

    render_fields: function(){
      return this.show.changePassword ? this.fields_password : this.fields;
    }, // render_fields
  },
  methods : {
    actions(actionn, item, option){
      if (actionn) {
        if (actionn.action == "update") {
          this.update();
        }
      }
    }, // actions

    getProfile(item){
      if (item && item.id) {

        this.$Axios.get("/api/v1/profile/" + item.id).then(res => {
          if (res && res.data) {
            this.info = { ...this.info, ...res.data };
          }
        }).catch(err => { 
          console.warn("Error get profile ", err);
        })
      }
    }, // getProfile

    render_listed(item){
      if (item) {
          let temp = []
          if (item.global_list) {;
            temp = this.$ManagerSmith.render_listed(item);
          }
          if (temp && temp.length === 0 && typeof item.list  == "string") {
            temp = this[item.list];
          }
          if (!temp && typeof item.list  == "string") {
            temp = this[item.list];           
          }
          /*if (item.key == "cityString") {

            console.log(" ================== LIST "+ item.key + item.list, temp , item)
          }*/
          return temp;
        }
        return [];
    },

    update(){
      if (this.info && this.info.id) {
        this.$Axios.put("/api/v1/user/" + this.info.id, this.info).then(res => {
          this.$EventBus.$emit("notifications",{
            type : "success",
            msg  : this.$t("uptated")
          });
          if (res && res.data) {
            this.$store.commit("auth/updateUsername", this.info)
          }
        }).catch(err => {
          this.$EventBus.$emit("notifications",{
            type : "error",
            msg  : this.$t("error_update")
          })
        })
      }
    }
  }, // methods

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};