const { createApp } = Vue;

createApp({
  data() {
    return {
      usernameInput: localStorage.getItem("username"),
      passwordInput: "",
      firstName: "",
      isLoggedIn: !!localStorage.getItem("username"),

      users: [
        { username: "admin", password: "admin", firstName: "Admin" },
        {
          username: "carolinenord",
          password: "password",
          firstName: "Caroline",
        },
      ],

      newItemTitle: "",
      newItemLocation: "",
      newItemType: "",
      newItemStatusbar: "dreaming",
      newItemDescription: "",
      newItemImageUrl: "",
      filterMode: "all",
      bucketItems: [
        {
          id: 1,
          title: "The Eiffel Tower",
          location: "Paris, France",
          type: "Experience",
          statusbar: "completed",
          description:
            "A visit to the iconic Eiffel Tower, enjoying the breathtaking views of Paris from the top.",
          imageUrl: "images/eiffel.jpg",
        },
        {
          id: 2,
          title: "Santorini",
          location: "Greece",
          type: "Destination",
          statusbar: "completed",
          description:
            "A beautiful island in the Aegean Sea, known for its stunning sunsets and white-washed buildings.",
          imageUrl: "images/santorini.jpg",
        },
        {
          id: 3,
          title: "Tokyo",
          location: "Japan",
          type: "Destination",
          statusbar: "planning",
          description:
            "The vibrant capital of Japan, known for its modern architecture, rich culture, and delicious cuisine.",
          imageUrl: "images/tokyo.jpg",
        },
        {
          id: 4,
          title: "Safari in Kenya",
          location: "Kenya",
          type: "Experience",
          statusbar: "dreaming",
          description:
            "An adventurous safari experience in the savannahs of Kenya, witnessing the majestic wildlife in their natural habitat.",
          imageUrl: "images/safari.jpg",
        },
        {
          id: 5,
          title: "Machu Picchu",
          location: "Peru",
          type: "Destination",
          statusbar: "dreaming",
          description:
            "An ancient Incan city set high in the Andes Mountains, known for its archaeological significance and breathtaking views.",
          imageUrl: "images/machu.jpg",
        },
        {
          id: 6,
          title: "Halfling Marathon",
          location: "New Zealand",
          type: "Experience",
          statusbar: "dreaming",
          description:
            "Participate in the famous Halfling Marathon, a unique running event that takes you through the stunning landscapes of New Zealand where The Shire was filmed.",
          imageUrl: "images/halfling.jpg",
        },
      ],
    };
  },
  // computed properties are reactive and will update automatically when the underlying data changes without needing to be manually updated.

  computed: {
    welcomeName() {
      const user = this.users.find(
        (user) => user.username === this.usernameInput,
      );
      return user ? user.firstName : "Dreamer";
    },

    experiencesCount() {
      return this.bucketItems.filter(
        (item) => item.type.toLowerCase() === "experience",
      ).length;
    },

    destinationsCount() {
      return this.bucketItems.filter(
        (item) => item.type.toLowerCase() === "destination",
      ).length;
    },

    completedCount() {
      return this.bucketItems.filter(
        (item) => item.statusbar.toLowerCase() === "completed",
      ).length;
    },

    sortedBucketItemsCompletedLast() {
      return [...this.bucketItems].sort((a, b) => {
        if (a.statusbar === "completed" && b.statusbar !== "completed") {
          return 1; // a flyttas ner (avklarade objekt ska komma sist)
        }
        if (a.statusbar !== "completed" && b.statusbar === "completed") {
          return -1; // a flyttas upp (oavklarade objekt ska komma först)
        }
        return 0; // behåll ordningen om båda har samma status
      });
    },
    visibleItems() {
      return this.sortedBucketItemsCompletedLast.filter((item) => {
        if (this.filterMode === "experiences")
          return item.type === "Experience";
        if (this.filterMode === "destinations")
          return item.type === "Destination";
        return true; // "all"
      });
    },
  },
  methods: {
    goToLogin() {
      window.location.href = "login.html";
    },
    login() {
      const user = this.users.find(
        (user) =>
          user.username === this.usernameInput &&
          user.password === this.passwordInput,
      );
      if (user) {
        alert("Login successful!");
        localStorage.setItem("username", this.usernameInput);
        window.location.href = "index.html";
        this.isLoggedIn = true;
      } else {
        alert("Invalid username or password.");
      }
    },
    logout() {
      localStorage.removeItem("username");
      alert("You have been logged out.");
      window.location.href = "index.html";
      this.isLoggedIn = false;
    },
    addBucketItem() {
      if (!this.newItemTitle) return;

      const type =
        this.newItemType.charAt(0).toUpperCase() +
        this.newItemType.slice(1).toLowerCase();

      this.bucketItems.push({
        id: this.bucketItems.length + 1,
        title: this.newItemTitle,
        location: this.newItemLocation,
        type: type,
        statusbar: this.newItemStatusbar,
        description: this.newItemDescription,
        imageUrl: this.newItemImageUrl,
      });

      this.newItemTitle = "";
      this.newItemLocation = "";
      this.newItemType = "";
      this.newItemDescription = "";
      this.newItemImageUrl = "";
    },
    deleteBucketItem(id) {
      this.bucketItems = this.bucketItems.filter((item) => item.id !== id);
    },
  },
}).mount("#app");
