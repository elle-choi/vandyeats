import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import Link
import Navbar from "./NavBar";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const RestaurantInfo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const place_id = queryParams.get("re_info"); // ID of restaurant

  const names = [
    "Banh Mi & Roll",
    "Barista Parlor",
    "Biscuit Love",
    "Central BBQ",
    "Grain & Berry",
    "The Grilled Cheeserie",
    "Hopdoddy Burger Bar",
    "Jeni’s Splendid Ice Creams",
    "Meet Noodles",
    "Sushi 88",
    "Taco Mama",
    "The Urban Juicer",
    "Ben & Jerry’s",
    "Chuy’s Tex Mex",
    "Donatos Pizza",
    "Helen’s Hot Chicken",
    "The Poki",
    "Sarabha’s Creamery",
    "The Slider House",
    "Urban Cookhouse",
    "8th and Roast",
    "Bombay Palace",
    "Chili’s",
    "Crab Fever",
    "Hyderabad House",
    "Wendy’s",
    "Inchin’s Bamboo Garden",
    "Papa John’s Pizza",
    "Sitar",
    "Sun & Fork",
    "Yaki House",
    "Elliston Place Soda Shop",
    "Frutta Bowls",
    "I Love Sushi",
    "Roma Pizza & Pasta",
    "Jet’s Pizza",
    "Michaelangelo’s Pizza",
    "Oscar’s Taco Shop",
    "Poke Bros.",
    "Satay Thai Grill",
    "Sweet Dots Bubble Tea",
    "Holy Smokes",
    "Red Bicycle",
    "Woodlands",
  ];

  const main_imgs = [
    require("../assets/banhmi&roll_b.webp"),
    require("../assets/barista-parlor_b.webp"),
    require("../assets/biscuit-love_b.webp"),
    require("../assets/central-bbq_b.webp"),
    require("../assets/grain-berry_b.webp"),
    require("../assets/grilled-cheeserie.webp"),
    require("../assets/hop-doddy.webp"),
    require("../assets/jenis-icecream.webp"),
    require("../assets/meet-noodles.webp"),
    require("../assets/sushi88.webp"),
    require("../assets/taco-mama.webp"),
    require("../assets/urban-juicer.webp"),
    require("../assets/ben-n-jerrys.webp"),
    require("../assets/chuys.webp"),
    require("../assets/donatos-pizza.webp"),
    require("../assets/helens-hot-chicken.webp"),
    require("../assets/the-poki.webp"),
    require("../assets/sarabhas-creamery.webp"),
    require("../assets/the-slider-house.webp"),
    require("../assets/urban-cookhouse.webp"),
    require("../assets/8th-and-roast.webp"),
    require("../assets/bombay-palace.webp"),
    require("../assets/chillis.webp"),
    require("../assets/crab-fever.webp"),
    require("../assets/hyderabad-house.webp"),
    require("../assets/wendys.webp"),
    require("../assets/inchins-bamboo-garden.webp"),
    require("../assets/papa-johns.webp"),
    require("../assets/sitar.webp"),
    require("../assets/sun-n-fork.webp"),
    require("../assets/yaki-house.webp"),
    require("../assets/elliston-place-soda-shop.webp"),
    require("../assets/frutta-bowls.webp"),
    require("../assets/i-love-sushi.webp"),
    require("../assets/roma-pizza-n-pasta.webp"),
    require("../assets/jets-pizza.webp"),
    require("../assets/michaelangelos-pizza.webp"),
    require("../assets/oscars-taco-shop.webp"),
    require("../assets/poke-bros.webp"),
    require("../assets/thai-satay.webp"),
    require("../assets/sweet-dots.webp"),
    require("../assets/holy-smokes.webp"),
    require("../assets/red-bicycle.webp"),
    require("../assets/woodlands.webp"),
  ];

  const place_info = [
    ["Vietnamese", "$$"],
    ["Coffee Shop", "$"],
    ["American", "$$"],
    ["American", "$$"],
    ["Brunch", "$$"],
    ["American", "$$$"],
    ["American", "$$"],
    ["Ice Cream", "$$"],
    ["Chinese", "$$"],
    ["Japanese", "$$$"],
    ["Mexican", "$$"],
    ["Brunch", "$$"],
    ["Ice Cream", "$"],
    ["Mexican", "$$"],
    ["Pizza", "$$"],
    ["American", "$$"],
    ["Poke Bowls", "$$"],
    ["Ice Cream", "$"],
    ["American", "$$"],
    ["American", "$$"],
    ["Coffee Shop", "$"],
    ["Indian", "$$"],
    ["American", "$$"],
    ["Seafood", "$$$"],
    ["Indian", "$$"],
    ["Fast Food", "$"],
    ["Pan-Asian", "$$$"],
    ["Pizza", "$$"],
    ["Indian", "$$$"],
    ["Brunch", "$$"],
    ["Asian Fusion", "$$"],
    ["Soda Shop", "$$"],
    ["Acai Bowl", "$$"],
    ["Japanese", "$$$"],
    ["Pizza", "$$"],
    ["Pizza", "$$"],
    ["Pizza", "$$"],
    ["Mexican", "$$"],
    ["Poke Bar", "$$"],
    ["Thai", "$$"],
    ["Boba Shop", "$"],
    ["American", "$$"],
    ["Coffee Shop", "$"],
    ["Indian", "$$"],
  ];

  const menu_link = [
    ["https://banhmiandrollplus.com/menu/"],
    ["https://baristaparlor.com/pages/menu"],
    ["https://www.biscuitlove.com/menu"],
    ["https://eatcbq.com/"],
    ["https://grainandberry.com/menu/"],
    ["https://grilledcheeserie.com/menu/"],
    ["https://qrco.de/HDNashville"],
    ["https://jenis.com/collections/all-flavors"],
    ["https://meetnoodles.kwickmenu.com/"],
    ["https://menupages.com/sushi-88/2119-belcourt-ave-nashville"],
    ["https://tacomamaonline.com/view-menu/"],
    ["https://theurbanjuicer.com/our-menu/"],
    ["https://www.benjerry.com/flavors"],
    ["https://www.chuys.com/menu/food"],
    ["https://donatos.com/menu/pizza/hot-chicken"],
    ["https://www.helenshotchicken.com/menu"],
    ["https://thepoki.com/brentwood-the-poki-food-menu"],
    ["https://sarabhascreamery.com/typography/"],
    ["https://sliderhousensh.com/food-menu"],
    ["https://www.urbancookhouse.com/category/full-menu/?post_type=menu"],
    ["https://www.8thandroast.com/menu"],
    ["https://qmenu.us/#/bombay-palace-nashville/menu/menu-0/details"],
    ["https://www.chilis.com/menu"],
    ["https://www.crabfever.com/"],
    ["https://hyderabadhousenashville.com/menu?location=hyderabadnashville"],
    ["https://www.wendys.com/en-uk/menu/our-menu"],
    ["https://bamboo-gardens.com/menu/"],
    ["https://www.papajohns.com/order/menu"],
    ["https://sitarnashville.com/menu"],
    ["https://sunandfork.com/menu/"],
    ["https://www.yakihousenashville.com/en/menu"],
    ["https://www.ellistonplacesodashop.com/menu"],
    ["https://fruttabowls.com/menus/"],
    ["https://www.ilovesushinashville.com/menu"],
    ["https://romapizzaandpasta.com/menu/"],
    ["https://www.jetspizza.com/menu/"],
    ["https://www.michaelangelosmenu.com/"],
    ["https://oscarstacoshop.com/menu/south-nashville/"],
    ["https://eatpokebros.com/menu/"],
    ["https://www.thaisataynashville.com/menu"],
    ["https://www.sweetdots.com/menu"],
    ["https://holysmokeskosher.org/menu"],
    ["https://redbicycleiris.square.site/"],
    ["https://woodlandstennessee.com/menu?location=woodlandstennessee"],
  ];

  /*Restaurant Info Separation*/
  const basic_text = [" |", ""];

  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [userProfilePics, setUserProfilePics] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);

        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const userProfilePicsData = {};

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          userProfilePicsData[doc.id] = userData.profilePic;
        });

        setUserProfilePics(userProfilePicsData);

        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        //const avg_data = posts.length > 0 ? posts.redude((acc,post) => acc + ( post.rating || 0 ),0) : 0;

        // Fetch user images for each post
        const postsWithUserImages = await Promise.all(
          posts.map(async (post) => {
            // Assuming you have a way to get the user image URL from the user ID
            const userRef = doc(db, "users", post.author.id);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userImageUrl = userSnap.data().imageUrl; // Assuming imageUrl holds the image URL
              return {
                ...post,
                author: { ...post.author, imageUrl: userImageUrl },
              };
            } else {
              return post; // Return the post as is if no user data found
            }
          })
        );

        setPostList(postsWithUserImages);
      } catch (error) {
        console.error("Error fetching user profile pictures:", error);
      }
    };

    getPosts();
  }, []);

  //function to temporarily remove images from post review to only show text in the preview
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const imgElements = doc.getElementsByTagName("img");

    // Replace img elements with placeholders and remove [Image: ] from text
    for (let i = imgElements.length - 1; i >= 0; i--) {
      const img = imgElements[i];
      const placeholder = document.createTextNode("");
      img.parentNode.replaceChild(placeholder, img);
    }

    return doc.body.textContent.replace(/\[Image: \]/g, "") || "";
  };

  return (
    <div class="w-screen h-screen flex flex-col">
      <Navbar />

      <div class="bg-[rgb(254,249,240)] flex flex-grow h-full pt-16">
        <div class="w-full h-full flex-col text-black items-center">
          {/** Navigation UI */}
          <div class="w-full h-2/12 flex mt-5  pl-5">
            <Link to="../home" class="hover:text-orange-300">
              Home
            </Link>
            <a>/</a>
            <Link to="../restaurant" class="hover:text-orange-300">
              Restaurant
            </Link>
            <a>/</a>
            <a class="hover:text-orange-300">{names[place_id]}</a>
          </div>

          <div class="flex w-full justify-center my-3">
            <img
              src={main_imgs[place_id]}
              class="h-60 w-full rounded-xl mx-5 object-cover"
            />
          </div>
          <div class="ml-5 flex">
            <div>
              <p class="text-2xl font-bold">{names[place_id]}</p>
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 117.42"
                >
                  <path
                    d="M66.71 3.55L81.1 37.26l36.58 3.28v-.01c1.55.13 2.91.89 3.85 2.01a5.663 5.663 0 011.32 4.13v.01a5.673 5.673 0 01-1.69 3.57c-.12.13-.25.25-.39.36L93.25 74.64l8.19 35.83c.35 1.53.05 3.06-.73 4.29a5.652 5.652 0 01-3.54 2.52l-.14.03c-.71.14-1.43.15-2.12.02v.01c-.75-.13-1.47-.42-2.11-.84l-.05-.03-31.3-18.71-31.55 18.86a5.664 5.664 0 01-7.79-1.96c-.38-.64-.62-1.33-.73-2.02-.1-.63-.09-1.27.02-1.89.02-.13.04-.27.08-.4l8.16-35.7c-9.24-8.07-18.74-16.1-27.83-24.3l-.08-.08a5.64 5.64 0 01-1.72-3.7c-.1-1.45.36-2.93 1.4-4.12l.12-.13.08-.08a5.668 5.668 0 013.77-1.72h.06l36.34-3.26 14.44-33.8c.61-1.44 1.76-2.5 3.11-3.05 1.35-.54 2.9-.57 4.34.04.69.29 1.3.71 1.8 1.22.53.53.94 1.15 1.22 1.82l.02.06zm10.19 37.2L61.85 5.51a.42.42 0 00-.09-.14.42.42 0 00-.14-.09.427.427 0 00-.35 0c-.1.04-.19.12-.24.24L45.98 40.75c-.37.86-1.18 1.49-2.18 1.58l-37.9 3.4c-.08.01-.16.02-.24.02-.06 0-.13.02-.18.05-.03.01-.05.03-.07.05l-.1.12c-.05.08-.07.17-.06.26.01.09.04.18.09.25.06.05.13.11.19.17l28.63 25c.77.61 1.17 1.62.94 2.65l-8.51 37.22-.03.14c-.01.06-.02.12-.01.17a.454.454 0 00.33.36c.12.03.24.02.34-.04l32.85-19.64c.8-.5 1.85-.54 2.72-.02L95.43 112c.08.04.16.09.24.14.05.03.1.05.16.06v.01c.04.01.09.01.14 0l.04-.01c.12-.03.22-.1.28-.2.06-.09.08-.21.05-.33L87.8 74.28a2.6 2.6 0 01.83-2.55l28.86-25.2c.04-.03.07-.08.1-.13.02-.04.03-.1.04-.17a.497.497 0 00-.09-.33.48.48 0 00-.3-.15v-.01c-.01 0-.03 0-.03-.01l-37.97-3.41c-1-.01-1.93-.6-2.34-1.57z"
                    fill="#000000"
                  />
                </svg>
                <div class="flex">
                  <p class="font-bold">
                    {parseFloat(
                      postList.filter(
                        (post) => post.restaurant === names[place_id]
                      ).length > 0
                        ? postList
                            .filter(
                              (post) => post.restaurant === names[place_id]
                            )
                            .reduce(
                              (acc, post) => acc + (post.rating || 0),
                              0
                            ) /
                            postList.filter(
                              (post) => post.restaurant === names[place_id]
                            ).length
                        : 0
                    ).toFixed(2)}
                  </p>
                  {postList.filter(
                    (post) => post.restaurant === names[place_id]
                  ).length < 100 && (
                    <p>
                      (
                      {
                        postList.filter(
                          (post) => post.restaurant === names[place_id]
                        ).length
                      }{" "}
                      Blogs) |
                    </p>
                  )}
                  {postList.filter(
                    (post) => post.restaurant === names[place_id]
                  ).length >= 100 && <p>(+(100+) Blogs) |</p>}
                </div>

                {place_info[place_id].map((item, index) => (
                  /* restaurant info */
                  <p key={index}>
                    &nbsp;{item}
                    {basic_text[index]}&nbsp;
                  </p>
                ))}
              </div>
            </div>
            <div class="flex flex-grow justify-end items-center pr-10">
              <a
                href={menu_link[place_id]}
                class="w-40 h-12 rounded-lg text-xl flex justify-center items-center font-bold text-center bg-[#38761D] hover:bg-[#7ab661]"
              >
                <p class="text-white hover:text-black">View Menu</p>
              </a>
            </div>
          </div>
          <p class="text-2xl font-bold mx-5 mt-5 mb-2">Popular Blogs</p>
          <div class="w-full bg-[rgb(254,249,240)]">
            <div class="  justify-center border-gray-600 rounded-md mx-5 py-2">
              {postList
                .filter((post) => post.restaurant === names[place_id])
                .map((post) => (
                  // bring just each restaurant
                  <div
                    key={post.id}
                    className=" p-4   mb-4 flex border-2 rounded-lg border-gray-400"
                    onClick={() => navigate(`/blog/${post.id}?source=restaurant`)}
                  >
                    <div className="flex-col w-10/12">
                      <div class="flex items-center">
                        {/* INSERT PROFILE IMAGE CODE HERE */}
                        <img
                          src={userProfilePics[post.author.id]}
                          alt={`Profile of ${post.author.name}`}
                          class="rounded-full mr-3 w-14 h-14"
                        />
                        <p className="text-green-600">{post.author.name}</p>
                      </div>

                      <h2 className="text-xl text-gray-600 font-bold mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 overflow-hidden overflow-ellipsis max-w-[1000px]">
                        {stripHtmlTags(post.review).length > 150
                          ? `${stripHtmlTags(post.review).substring(0, 150)}...`
                          : stripHtmlTags(post.review)}
                      </p>
                      <div class="flex font-bold ">
                        <p>Rating :&nbsp;</p>
                        <p>{post.rating}</p>
                      </div>

                      <div className="mt-4"></div>
                    </div>
                    <div className="ml-4 2/12">
                      <img
                        src={post.image}
                        alt={`Blog ${post.title}`}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantInfo;
