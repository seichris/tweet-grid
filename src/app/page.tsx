"use client";
import React, { useState } from "react";
import { Tweet } from "react-tweet";

interface GridItem {
  type: "tweet" | "image";
  value: string;
  winner: string;
  category: string;
  comment?: string;
  commentUrl?: string;
  finalist?: string;
  index?: number;
  finalistIndex?: string;
}

const MyResponsiveGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Finalists");

  const categories = ["Art", "IRL", "Meme", "Educational"];


  const shuffle = (array: GridItem[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Function to get finalists across all categories
  const getFinalists = () => {
    return gridItems.filter(item => item.finalist === 'finalist');
  };
  
  // // Function to process items based on the selected category or "Finalists"
  // const processItems = (category: string | null) => {
  //   let itemsToShow: GridItem[] = [];

  //   if (category === "Finalists") {
  //     itemsToShow = getFinalists();
  //   } else {
  //     // Filter by category if one is selected, otherwise include all items
  //     const itemsByCategory = category ? gridItems.filter(item => item.category === category) : [...gridItems];

  //     // Separate finalists and non-finalists
  //     const finalists = itemsByCategory.filter(item => item.finalist === 'finalist');
  //     const nonFinalists = itemsByCategory.filter(item => item.finalist !== 'finalist');

  //     // Concatenate finalists and non-finalists, ensuring finalists are on top
  //     itemsToShow = [...finalists, ...nonFinalists];

  //     // Optionally shuffle each subgroup (finalists/non-finalists) separately if needed
  //     shuffle(finalists);
  //     // shuffle(nonFinalists);
  //   }

  //   return itemsToShow;
  // };

  // Function to process items based on the selected category or "Finalists"
  const processItems = (category: string | null) => {
    let itemsToShow: GridItem[] = [];

    if (category === "Finalists") {
      let finalists = getFinalists();
      shuffle(finalists);
      itemsToShow = finalists;
    } else if (category === "All" || !category) {
      // If "All" or no category selected, prioritize finalists across all items
      const finalists = gridItems.filter(item => item.finalist === 'finalist');
      shuffle(finalists);
      const nonFinalists = gridItems.filter(item => item.finalist !== 'finalist');
      itemsToShow = [...finalists, ...nonFinalists];
    } else {
      // Filter by specific category
      const itemsByCategory = gridItems.filter(item => item.category === category);
      const finalists = itemsByCategory.filter(item => item.finalist === 'finalist');
      shuffle(finalists);
      const nonFinalists = itemsByCategory.filter(item => item.finalist !== 'finalist');
      itemsToShow = [...finalists, ...nonFinalists];
    }

    return itemsToShow;
  };

  let processedItems = processItems(selectedCategory);

  const numColumns = 4;
  const columns: GridItem[][] = Array.from({ length: numColumns }, () => []);

  processedItems.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });

  return (
    <div>
      {/* Category Selection Buttons */}
      <div className="mb-4 flex justify-center">
        <div className="space-x-2">
          {categories.map(category => (
            <button
              key={category}
              className={`inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${selectedCategory === category ? "bg-neutral-400" : "bg-neutral-100"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="ml-20 space-x-2">
          <button
            className={`inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${selectedCategory === null ? "bg-neutral-400" : "bg-neutral-100"}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            className={`inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${selectedCategory === "Finalists" ? "bg-neutral-400" : "bg-neutral-100"}`}
            onClick={() => setSelectedCategory("Finalists")}
          >
            Finalists
          </button>
        </div>
      </div>


      <div className="flex flex-wrap -mx-4 px-4">
        {columns.map((columnItems, colIndex) =>
          <div key={colIndex} className="w-full md:w-1/2 lg:w-1/4 px-4">
            {columnItems.map((item, itemIndex) => {
              const globalIndex = colIndex + (itemIndex * numColumns);
              return (
                <div key={itemIndex} className="mb-4 relative">
                {/* {item.category && (
                  <div className="absolute top-0 left-0 bg-blue-500 text-white py-1 px-2 text-xs rounded-br z-10">
                    {item.category}
                  </div>
                )} */}
                <div className="absolute top-0 right-14 bg-white py-1 px-2 text-sm text-black rounded-b z-10 flex items-center">
                  {item.comment && item.commentUrl ? (
                    <a href={item.commentUrl} target="_blank" rel="noopener noreferrer" className="text-sm mr-2 text-gray-500 hover:text-blue-600">
                      {item.comment}
                    </a>
                  ) : item.comment ? (
                    <span className="text-sm text-gray-600">{item.comment}</span>
                  ) : null}
                  <span className="mr-2">{item.finalistIndex ? `Finalist #${item.finalistIndex}` : ""}</span>
                  {item.category && (
                    <span className="mr-2">{item.category}</span>
                  )}
                </div>
                {item.type === "tweet" ? (
                  <Tweet id={item.value} />
                ) : (
                  <img
                    src={item.value}
                    alt={`Grid item ${itemIndex}`}
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResponsiveGrid;



const gridItems: GridItem[] = [
  { type: "tweet", value: "1768160403606102096", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768234778220810304", finalist: 'finalist', finalistIndex: "1", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768562828913336748", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769384465703260317", finalist: 'finalist', finalistIndex: "2", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768704300702715914", winner: "top25" , category: "IRL",
  // comment: "Duplicate submission in Art"
  },
  { type: "tweet", value: "1768748192643113217", finalist: 'finalist', finalistIndex: "3", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768809500197478751", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768973634604003491", finalist: 'finalist', finalistIndex: "4", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769065113464578189", finalist: 'finalist', finalistIndex: "5", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769192591415992744", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768568951741862400", finalist: 'finalist', finalistIndex: "6", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769289183712207347", finalist: 'finalist', finalistIndex: "7", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769310315584639355", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769317460795179235", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769379190984544289", finalist: 'finalist', finalistIndex: "8", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769404334834589939", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769411590669881494", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769597128526201006", winner: "top25" , category: "IRL", comment: "Play game at zeek.lol", commentUrl: "https://www.zeek.lol/en/" },
  { type: "tweet", value: "1769470296963055620", finalist: 'finalist', finalistIndex: "9", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769511262021394719", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1768932267987234921", winner: "top25" , category: "IRL" },
  // { type: "tweet", value: "1768995512810946979", winner: "top25" , category: "IRL", comment: "Tweet has been made private?!", commentUrl: "https://twitter.com/AdenKubiga/status/1768995512810946979" },
  {
    type: "image",
    winner: "top25" ,
    category: "IRL",
    finalist: 'finalist', finalistIndex: "10",
    value:
      "https://pbs.twimg.com/media/GIy6sKabEAACvmE?format=jpg&name=large",
    // comment: "See video on Twitter", commentUrl: "https://twitter.com/AdenKubiga/status/1768995512810946979"
  },
  { type: "tweet", value: "1769136367479529719", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769249447668858916", winner: "top25" , category: "IRL" },
  { type: "tweet", value: "1769335346490425629", winner: "top25" , category: "IRL" },

  
  { type: "tweet", value: "1767619577926517108", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1767926615193886853", winner: "lowerThan25", category: "IRL" },
  // { type: "tweet", value: "1768293393476800828", winner: "lowerThan25", category: "IRL" },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://twitter.com/GuJiu_888/status/1768293393476800828?t=I2H6J5guNRRnmBziJvM3bw&s=19
    value:
      "https://i.imgur.com/UEVWVX1.png",
  },
  // wool cat above
  // { type: "tweet", value: "1768321381261881364", winner: "lowerThan25", category: "IRL" },
  {
    type: "image",
    winner: "top25" ,
    category: "IRL",
    value:
      "https://i.imgur.com/zPZoYVM.png",
    // comment: "See video on Twitter", commentUrl: "https://twitter.com/billi_x4/status/1768321381261881364?t=BObwY1xodf4kadzJSSVqtg&s=19"
  },
  { type: "tweet", value: "1768345893198074357", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1768474487903625313", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1768672097323421809", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1768878413614596198", winner: "lowerThan25", category: "IRL" },
  // { type: "tweet", value: "1768890903337500874", winner: "lowerThan25", category: "IRL" },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "IRL",
    // https://twitter.com/Asheeqa_35/status/1768890903337500874/photo/2
    value:
    "https://pbs.twimg.com/media/GIxcpCba0AA_cnR?format=jpg&name=large",
  },
  { type: "tweet", value: "1768965869127061516", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769001160160018932", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769003033470407157", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769040328802095134", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769050115287736727", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769056488549470276", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769102592318099845", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769135405297742041", winner: "lowerThan25", category: "IRL" },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "IRL",
    // https://drive.google.com/drive/folders/18fRI07e4qx2EiiG4jYCROAnNr5D1dtfA
    value:
    "https://lh3.googleusercontent.com/fife/ALs6j_GM5rLCZmQeAI9XtuUGHIvSz5bUy7Ov_XxsLb3idAQKfhCZn3r00our_3NW16grEzQUzj2vCFcu9KEaxbLVBxOL05D8-A9RUcc7tkdiOex_eFerbOPW9Dyu0XMDYJJSLAxTfAxnZGER9-IrDIFia0ErOBJyTGmjVjhGrV5nINdMUJA9ydBcDntZoQ500wXzShstkBRfY74-_GZfTQg0H6Upep9DuJvTrcxQ4paaNVF5Bb42SihZ67pnss-3lF5h6_YQN4RWVVEzF_52xSUGVaaIk9DFgdWCjeAvAkkunJk5VzzDwIEM8DMGYb8paOFCNPiPnsKjxsmkpt97r2tsBBxwyMClAcDgE3DiIhDpFeLCjF_91XyMmd7tT47gVl-YgEHVwlHCwQtwKgc7QznLwhCbrmsNPx9FQopey0F-qNxmqevEwfaezMXqLpFFNkwER4zov9bFxTckOwMXE3w8FNcNAENuVGK4LkhPTy0_Ra4t-lPeMkHvEpKAdWCW7SwYklCRu1H_x8trFHhIBOdUc70uPdiD79ozt3WtoeOeFeokpx4RlEouF3ol37oRLWfYhpH4CllfqyXmdT8PtNUq7SD96HTJqJjCuVZz8eAVdnclkZAlrLZTDjBJjADHyqH1isBWnPPFRZebfUyDtgeQ7bdlimz_6YAzvPjn5F3lW_Joi1V1JW9r3vjfjkzFnBI3dTzEg2AtrH_c7P9nVjsXijjV7Rf8jeI_4K0fdmdDvXIQWxc0zwZg-SJwoug4DHdqH3TUZvlJ9TX6sOLBlXZ34vehTxqopnHPSC-xYXrD7TwbHDYqFcd4_-VXjfl67Zq6PlkhCqRExdpmu62xXWL9Gs7YFPP_4iSB4ugTYeXCTg2B4-r9qM4UlexwgUrM-KJxUO_kwtQlIyf_VMbgS9-7QeoEzloEl1zO84R-tLfA9n3yzDsnQXdJARSMmKHVFz6QUwjyDV8BYDkY_2aId9Cv8niNgO_GICc2QFp258a4rCAENrLKz9br5TE8TM3qJnkUdYhhqGchwuNaBj1po4QC6Xy-CfUN_epWmS5o6pvCGf63u6FBQ-kRxiq4InwSUjiRk2Q1mTLJLuXkgxmYnGCK802Hfzlk4qvdpXndj1HDIkqh2qlq-nyn7lSF0gc9oo9Nk7HWeTnODZCUQMggpqcPGm91WlJhh-I8w3O3Q80OhWnSiahSneOzQgOCFHka6XCTpKm2wIPFvOO_AcxR80i5e5lkDQMjuScDWgQeBrbv8FSn9oaENxNQYV45BjOO_nphmue6SooZZpwNY_BuelCvzu630uClAyWHJ11tVrNOYl2Zx-yUv6xwZ6ZW__zz6IznZzhPeuVeptehEwNzDlr1EFLqmPbzMyA7kydOq6wbEPFmPy1lQDjVCJAdYynTPSedOP_IKQwPFYgmTLVQZDglAxaeJN79i2qsyQiJWEt2nrF5aReKED3Kt5iu989rjkYmnQxN2U5SmQ0s8Ppb-GvHhzKlQpdd9fkwbLcFZ4w-aLjhPaEkeoqaPlf0S9_DhjKGW1NsXq-_e9YbcFUZcJvDABW66rspFjUxo_QfsO1AcZ5jfGl141Iq8_TtCgvoAw_dfHOUexFdSzUA2eTL5aJnmxFwC6WVBU7UKgeRSTRYZXB2jXRTD0Wj6BDhGBKoBHDayt30Nf5OFXzfY33bNzd18Jjz7jBTWz9faL5IXsnCiH49tIiKkuFvP7myWOL8eDofL8DSDVkXZmtuLE94J3Yifd1tEhtb83s=w3841-h2175",
  },
  { type: "tweet", value: "1769222914560143692", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769043873035370664", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769295372911092028", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769293522778325071", winner: "lowerThan25", category: "IRL" },
  // { type: "tweet", value: "1769331702596329744", winner: "lowerThan25", category: "IRL" },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "IRL",
    // https://twitter.com/xaib_crypto461/status/1769331702596329744/photo/1
    value:
    "https://pbs.twimg.com/media/GI3tzoPW4AArluw?format=jpg&name=medium",
  },
  { type: "tweet", value: "1769383546102432038", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769386614390956406", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769379476444422248", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769407140270047255", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769410056578335223", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769395305538257101", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769432029735555320", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769438649630839291", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769440124893347881", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769469841746932200", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769490647298318507", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769491452822753550", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769495348135800913", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769492704415682762", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769508575695515992", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769508269553574036", winner: "lowerThan25", category: "IRL" },
  { type: "tweet", value: "1769483553937502433", winner: "lowerThan25", category: "IRL" },
  




  { type: "tweet", value: "1767227169162326100", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1767239101206650936", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1768041034624241868", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1767932610972692522", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1767939796650152052", finalist: 'finalist', finalistIndex: "1", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1767978689357078847", finalist: 'finalist', finalistIndex: "2", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1768135279112495613", finalist: 'finalist', finalistIndex: "3", winner: "top25" , category: "Art" },
  // { type: "tweet", value: "1768180961097736411", finalist: 'finalist', finalistIndex: "4", winner: "top25" , category: "Art" },
  {
    type: "image",
    winner: "top25" ,
    category: "Art", finalist: 'finalist', finalistIndex: "4",
    comment: "Link",
    commentUrl: "https://twitter.com/MadMaxx_eth/status/1768180961097736411",
    value:
      "https://pbs.twimg.com/media/GInXNYAWYAA2iW2?format=jpg&name=medium",
  },
  {
    type: "image",
    winner: "top25" ,
    category: "Art",
    value:
      "https://pbs.twimg.com/media/GInXNYAWYAA2iW2?format=jpg&name=medium",
  },
  { type: "tweet", value: "1768289354932187187", winner: "top25" , category: "Art" },
  {
    type: "image",
    winner: "top25" ,
    category: "Art",
    value:
      "https://arweave.net/xWOk5l0kJldJs33XRZmyJbL7gs-9GGA34l0yFD8lc14",
  },
  { type: "tweet", value: "1768704300702715914", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1768930443179569635", finalist: "finalist", finalistIndex: "10", winner: "top25" , category: "Art" },
  {
    type: "image",
    winner: "top25" ,
    category: "Art",
    value:
      "https://getimage.bigint.co/getImage?image=https://bigint.fra1.cdn.digitaloceanspaces.com/bigint_originals/images/473.webp",
  },
  { type: "tweet", value: "1769007137685172552", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769063624692150649", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769130262712184848", finalist: 'finalist', finalistIndex: "5", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769402382851711351", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769284949725561053", finalist: 'finalist', finalistIndex: "6", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769381815109001291", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769407257102741533", finalist: 'finalist', finalistIndex: "7", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769399612492722316", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769415179056644387", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769438570840740160", winner: "top25" , category: "Art" },
  { type: "tweet", value: "1769483659432632521", finalist: 'finalist', finalistIndex: "8", winner: "top25" , category: "Art" },
  {
    type: "image",
    winner: "top25" ,
    category: "Art",
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbWR5UkVKYzhFYjExdXdiaDRWVWlzb2JvYkdhUGJ6czlBbjlwVTZYR3hhODlz",
  },
  // {
  //   type: 'tweet',
  //   value: '1769782943436689667',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  // {
  //   type: 'tweet',
  //   value: '1769133634072502488',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
{
    type: "image",
    winner: "top25" ,
    category: "Art",
    comment: "Link",
    commentUrl: "https://twitter.com/Hypnosis_ss/status/1769782943436689667",
    value:
      "https://pbs.twimg.com/media/GI-IKZfWAAE6_Hu?format=jpg&name=large",
  },
{
    type: "image",
    winner: "top25" ,
    category: "Art",
    comment: "Link",
    commentUrl: "https://twitter.com/Hypnosis_ss/status/1769133634072502488",
    value:
      "https://pbs.twimg.com/media/GI05EVsXAAEThUr?format=jpg&name=large",
  },





  {
    type: 'tweet',
    value: '1767217202766266854',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1767548755304468549',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1767579710983110945',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1767579710983110945',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    finalist: 'finalist', finalistIndex: "9",
    value:
      "https://yvr2jzs5eqtfosntpxlulgnsewzpxawpxumgan7cluzbipzfonpa.arweave.net/xWOk5l0kJldJs33XRZmyJbL7gs-9GGA34l0yFD8lc14",
  },
  {
    type: 'tweet',
    value: '1767594420256321552',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1767596148380848604',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1767810659931041896',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  // above 98
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    value:
      "https://pbs.twimg.com/media/GIiGWfLaUAA9Ez4?format=jpg&name=large",
  },
  {
    type: 'tweet',
    value: '1767621435269218417',
    winner: 'lowerThan25',
    category: 'Art'
  },
  { type: "tweet", value: "1768945979384909986", winner: "lowerThan25", category: "Art" },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xd02cb44adf7acf92eef81067ac276b453011ef40:37806700975136703658068009094028464050970202252009829617440500930424734744577
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9iYWZ5YmVpaDNrcTRjM3NlZGVqdGZ6N3lweWluZnZzb3J5dWV3eWFlYmF3Y2l2enA2amxuc2Z6MnZzNC9pbWFnZS5wbmc=",
  },
  {
    type: 'tweet',
    value: '1767903773836320845',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1767999016803954991',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    value:
      // "https://www.okx.com/cdn/nft/35e066d5-f5d0-4dee-9e93-6150d58072d6.png",
      "https://i.imgur.com/CFkGbuE.jpeg",
  },
  {
    type: 'tweet',
    value: '1768089319296868743',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768108431880155381',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768125701394219259',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768124856237801690',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768134296974336094',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768153154829336848',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768204122963038350',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768218419529417044',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768223889828774371',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768255114198851759',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768269500955414592',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1768293393476800828',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  {
    type: 'tweet',
    value: '1768328772447555863',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768367208822906961',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768384291208126659',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768443745278849190',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // above is 119
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://bigint.co/nft_detail/0xd477FB44966C9fC7e84f5dDd8d27Da3EDc8236D0/469
    value:
      "https://getimage.bigint.co/getImage?image=https://bigint.fra1.cdn.digitaloceanspaces.com/bigint_originals/images/469.webp",
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://bigint.co/nft_detail/0xd477FB44966C9fC7e84f5dDd8d27Da3EDc8236D0/471
    value:
      "https://getimage.bigint.co/getImage?image=https://bigint.fra1.cdn.digitaloceanspaces.com/bigint_originals/images/471.webp",
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://bigint.co/nft_detail/0xd477FB44966C9fC7e84f5dDd8d27Da3EDc8236D0/472
    value:
      "https://getimage.bigint.co/getImage?image=https://bigint.fra1.cdn.digitaloceanspaces.com/bigint_originals/images/472.webp",
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://bigint.co/nft_detail/0xd477FB44966C9fC7e84f5dDd8d27Da3EDc8236D0/473
    value:
      "https://getimage.bigint.co/getImage?image=https://bigint.fra1.cdn.digitaloceanspaces.com/bigint_originals/images/473.webp",
  },
  // {
  //   type: 'tweet',
  //   value: '1768380094114927054',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://twitter.com/_babayaga_1/status/1768380094114927054
    value:
      "https://pbs.twimg.com/media/GIqMUcRX0AASwS6?format=jpg&name=large",
  },
  {
    type: 'tweet',
    value: '1768520555140108697',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768610224745705490',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768318035583238395',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768677381529571486',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768686501414736171',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768735054967312565',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768770774733606964',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768830920717742143',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://www.okx.com/web3/marketplace/nft/asset/zksync-era/0x1517ba5c7b302c66bfbce2de17fd5c742bd2be34/628
    value:
      "https://www.okx.com/cdn/nft/1fe67e08-04e9-4dbb-a0f0-cdf12f224675.jpg?x-oss-process=image/format,webp/resize,w_1000/resize,w_784,type_6/ignore-error,1",
  },
  // {
  //   type: 'tweet',
  //   value: '1768832989641994688',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  // above and below 134
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://twitter.com/zenestraseven/status/1768832989641994688
    value:
      "https://i.imgur.com/5okO3Vv.gif",
  },
  {
    type: 'tweet',
    value: '1768850271126372427',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768868973507203326',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768870874109895032',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://drive.google.com/file/d/1jp48l_RT238rkmHEWvNBAqVdPWPLRdKT/view
    value:
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihb7kZv7kAx43pVAgaoT8DrgEd3zaZUY-eSVIPfApn0kGd9hubSTG778o19VvwJy0X55NNV6iZ3ZJ2qCgzNX9a79x2-0=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1768932538926375337',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768932267987234921',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768973407037567443',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://drive.google.com/drive/folders/1mUr7sHlblBo19hMO95kEhOqpucXloWza
    value:
      "https://lh3.googleusercontent.com/fife/ALs6j_H9imwtT3rwYcgRsY9jasJIhpOqdu23zF48zY_UaeGye1BPXOZc_LtzxLl-wJPe6RUG93BLxZdqdJsTV38wp-tCLp_3qkvGud63dVYmAUysIruaxfBF5k3-SRFkNkLSnzDNMf7pPT5z4VnvCDl2vYQZF18-Q_hdOkLc5-Is-zN6aId53HbHpHZ1ETzalEDyL2nODoKgTJkqr1Dz8h_utDz7IbhX4z_iT0hQktpMH92IzeaPSTpAMatOc8C9qhZVJVOlYIsOU6KPpCs4kQyC0W9KXx9EoGkwE-c5Q7dcXIYxWNwbSSczTeMeB5c3-2NY4ONQzQMNRei9PwXM8fKeMjb5DJtJniMHvvetT5d-dQRQL8I_IgRdyAfaPrsaFCOLM5DRq8-7qIkkE2B9s2Hl8xHLMKPZRzRhBJKroMEazuo6UHCY4_sRw0gxQPpDYIJIOZxN2dWo0nYBaDZqezf_kDyXQwfiun3ahQQNwt_v6ZhFAHZ5LX2RiLC8H-xDztM5lbm7X49kiN6_PE1Za0VlMxXbbUNR4slUUxS1JFqymuG8oOU4nDyY4V6n-MOYoSNKYk9jaeDE697YLDrpIOdu1kBhN57yBkJwRHu90VCoPtGpFnVESdj3RYSkB0uXYkUQEZCHybLf8ZQInBLnJsz2-xDin_qoO2u42JjHsWC_t9Lr-eZXaygVruUvUYcHuTmtlny9b7zUURYSKX5r9_KLLrmiD4VM_UIeSUshCxka58F6tVbE4J2Xh126-q5hq7rzLResAUwTQ7BmARs-ZWNnw565iwc0nO6G6jev35HRJljzE72lsdOAT6w6yN2IZIGivQ-4z4AJEcf5JiO3bye4vEBd6i7TFFF1UyLNHYi7ptP_AE-LghBMtMAcZHXA1Fjnn5uec3BJ9-IGJKIRw_jOO4k1-NXs94CFSt9pBts800GvHKVNr-t-BQrCLYr8PM4PybdH3iPrOUKh6-bJBO6eBQl5A4WuNYwDCW2YL7taTS_Mu3YGq2Z0oGW3UTITUvDjm_JhL0rDrlBX9JybtjdpEpIMqf4NS6cO8sMN7m6QVKkDrzAId44Ep_exUgtltzyTtwJcLfYz_0TJdAlq0AfGRHxHC3f_zKRawyfgbg9ota8tKjYa8T9N8ux2HALHX4UEbnmN6rP9iYFkhkC5IylkWpMjygKEkc4d-8ay2DqVuF3Jp88wO8wX2h2lKwNRjXYPYOAAt8YbCyUZf_NeyzoPD9qZ3ZCLu8xEJ1SLVFtcEqQFEkEOPGb0XeXFipMzlKkwGlTAJp0u-0xoSouUelRe5IX25ju-IYHL0_U0BXoJuAZ4q3bFcWN59GWSl1sPC8TetX4mHEEBF7ukzQ2YNgHME9B0Ji_6OFFPZFvk1sKshK7K4xfJCDrTpDYlXU32T0re0232cXQx00vdbdHIejNkuV-aTysIqNX_vgEGDEnCpaX0j6RFT7ta0O1FRa-ygZjMDDJOu4lJzJ4Eqgdjq0Ig64cU0YaXfTm6j7oTB6Yt4efyLuDsXHcp4gWp9zyIlu5-AFWnDXCBa2VyCO2m2_0GNmUqZyMqTc9kJYUoAXm2RwRS_xvkdktkA3yAZXrArfpZf8YvZV_ItAYnLqJK_lTP9Udw8fMdXzcK0sOiYDLAIpI4QzRg6oqZG4qvUq8XLRxkMLJ-EBuFIW_Vj7wWBtkF8wIzmSPUin8N7DuJmEty8ISJT8jdrJI6GVU6sO_dNdzlutCNcboko1e0dPyV0d3EFVlGAEySQQ=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1768981946191815137',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768950975187079304',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1768995512810946979',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://www.okx.com/web3/marketplace/nft/asset/zksync-era/0x1517ba5c7b302c66bfbce2de17fd5c742bd2be34/628
    value:
      "https://www.okx.com/cdn/nft/1fe67e08-04e9-4dbb-a0f0-cdf12f224675.jpg?x-oss-process=image/format,webp/resize,w_1000/resize,w_784,type_6/ignore-error,1",
  },
  {
    type: 'tweet',
    value: '1769000939955118327',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xd02cb44adf7acf92eef81067ac276b453011ef40:6126527509577184494749632583508745369609240514067096717071782525356621168646
    value:
      "https://i.imgur.com/Kuclwn0.png",
  },
  // above is 147
  {
    type: 'tweet',
    value: '1769002563960291469',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1768996056438636567',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769012589198246312',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769027038524870994',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769034996290134032',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769102336348041521',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://drive.google.com/drive/folders/1geeh-C-h5Bd0AgWY97V5h1QbCv5UH6Bo
    value:
      "https://lh3.googleusercontent.com/fife/ALs6j_HAfeWINDLw9RTNbILJj7tisHjKVjECR-NsB2kjI7Ma_UUFs4BniSuSSEMRn6Vav_Ka155bfXO6bN0FSEQA44e0LP7WTaCnd6fyMtVOF5ckrcTKMyTQlOtNxqddbA1X-1yXbeU6ULyHfB3hCB2lCcOXa8I5g17rWttOYTo4u8-acVA23moMMu5YFQlO-JF5v_akN8imc_JMaOnpeahzJEVeZMIKT7uTmYClWyCQtuz5KLRokcVcOcHQJ7LEpmSAiffXpjXNl0U1oN0Gijjbavr82v_LY6Nmvs02MKXZQDGSQaRrTI18PUp8pME6RCTVYexDg2XDy23QAQ-F1dAvGLnj4fXxBwbx9Qb02hgruRy9OvyaImgp0mECIaXv3lBiqa430GcjKxlaDwYe0FhpXKJ4SVXVSPGkfiCoHka_zQKjS3rs90kIt87TA3UzyAxH-_hOdv5GwcbtL8zxDh5Qfu0QHqi4V9cV7dCRMpoKvM4hNSzP6FKJzkS47OYpp76YmtY3lImOXUpeJQsDXl4cT0CfOr78w_am_QFdhQNoxRiclw-kGFce7bdUcSzk66d-HP7-dgKBLQc6vROWx_nmbW57MAFqgwNwZtfncvvE4fgc_xcAJXq71NjqNOKKEXaqiN7U03W5i8tLfB7DY9c3eDzycKLZs0Q1udrHj9aPwQAeAHiL3uwKmKnP2DMJF-18fzqsGU0a6Wc-4Cmbd4ALQ1JpMhsGlg2JCso1X2ypmVOQHjXtvHDFjl9fSMWfb31ciXTwPLJ9GSfNQPmyppc3HzHfdEOmn696r4_ahnC4CKhdNvPtkt0q8e01PlnvAVkWcwdmpSaLl-CH7LW2EGVwg2dHqUZ6mmZ4bQuxNTuG9pO_0unIJ5m0fy4L2IZSGgqLY5Y7WFqfuNY7_doC_UsNSL_x4WT_vs5yHeMAUsGlRDvhyjrti3dIzQUdTiueCM8qyAEo9pbc4G_QYloTC03zzyCGNPA1G62yGlaQ3fdVOJMVQElRLAU4VwKi7bGf3M8gJql_jZ0jkACcvtAw2A0cc2wfe-2-VyhxqGdVRxk7wJzUDs3UrodncNkHmRySNMNAHgnufZO_5hW-nZGfchSRrzmjlpQBg9qwEA-2NezXRP_W_tD7kh3p9M186j3f2k9tqE7ffWyzHg5qM41c48mWc8AcKkb5wwZPg_A4weKan7AmBfCClpgw8BjTtUOCMl_HZvWxyeQTFyn5eq2wY5dtNtEV8xSkx1x2MY0301GmiBABZ5ho_hEEku1CyxCHmaiAsjwZY-n_v_ULctjnqPNS5d6bViPfQ8BGvdY12RckszTk5DJzdpuQJ69IszkTrqx1_IZEUR5Fn7Lb4jMoRTD98B-9Q4Ay3j3QAXORHBQF5i6fZ68sC4hOTGPggG7CUY6a8D2iq6MjoczBFXCnOyZbJETJZO6qriDXgtnV5e0sZY21tSFl4zgRIdh9r8t15zn6rBADKnsq4bLKJVsy2U9eT45YUBm_RJx8uTrFiisZk7Pfvag5nFJi93oZzqAF86WVbVGCfXLtkyWK2lM_DO7ABxAXqDiKyg7BZ1Mvm59pz-6VFSaE0fEgDpOakt9CZb2ueET98Rw1YxQQJci2mI8TjYP4rSCV4dTx46GbR3Rg3h83qc_gQR_u8gUXdxG37BqxEOGvmFKfmlTaZCf6QLC-ezNvR9AKIeFnZjcH9IkNYR6oJd5Rdf6PXT5bILpCXNXmhZCwS0yLlo2xfxsc_aRPdKESEzxZBAw=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1769119117922214325',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1769130871599370544',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  {
    type: 'tweet',
    value: '1769136367479529719',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769104935570813316',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769159442912751877',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:709
    value:
      "https://ipfs.raribleuserdata.com/ipfs/QmeXfKHugnBLa19BjhZ7eBXWSxZoD4xUa8Sk9W67ZDRFEK",
  },
  {
    type: 'tweet',
    value: '1769166980643459549',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769177231123783976',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769190956589621667',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769207823559426156',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769224032141160924',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769231639186731131',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:578
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbWR5UkVKYzhFYjExdXdiaDRWVWlzb2JvYkdhUGJ6czlBbjlwVTZYR3hhODlz",
  },
  {
    type: 'tweet',
    value: '1769249447668858916',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769253758796714179',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769299329683222717',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769301061947253240',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769312195135914413',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1769103165222162518',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  // 171 above and below
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    //       "https://pbs.twimg.com/media/GI0d8-nX0AASRDe?format=jpg&name=medium",
    value:
      "https://pbs.twimg.com/media/GI0d8-nX0AASRDe?format=jpg&name=medium",
  },
  {
    type: 'tweet',
    value: '1769328065937621421',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769318654661857416',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769312353739522251',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769313808580051236',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769353954259845580',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769363930869084438',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769398491879731438',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769335346490425629',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769410151478649144',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // {
  //   type: 'tweet',
  //   value: '1769439626010173757',
  //   winner: 'lowerThan25',
  //   category: 'Art'
  // },
  // 181
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://twitter.com/Moin65786763/status/1769439626010173757
    value:
      "https://i.imgur.com/v2LwsJ8.png",
  },
  {
    type: 'tweet',
    value: '1769451547514028383',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://drive.google.com/file/d/1psJvZ3eZ4XxGXvNs_xQxg_fVt--D_q1D/view
    value:
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaObhn-yeABbjK5hzGl_vOd2G7w7LH6dNmkfajFB9pFc4aB90Qqn5H4UOYiwI2kbX7l6S95MAovInidFQeFxEBG_Dk-_g=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1769458863236133194',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769466114398970205',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769469841746932200',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769469401453985990',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769469405019123832',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769469408668250444',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769473950256423342',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:146
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbWJ3V1RQbmpWZjJCZnpwZWk1ZFlYWjdGSFh4em9nQWlkWGtjbVVlNDVnU2tT",
  },
  {
    type: 'tweet',
    value: '1769471121743552929',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769475160145318374',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769481363680637141',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769482770307236248',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769483626604040481',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Art",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:426
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbVk0aVR0YXdVVHZZMk5wb2lmSFdwb2lXZ25DODdLb0JCbWZkcEh5emVyZXdI",
  },
  {
    type: 'tweet',
    value: '1769484656632643605',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769486856343679012',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769484900003160396',
    winner: 'lowerThan25',
    category: 'Art'
  },
  // above is 200
  {
    type: 'tweet',
    value: '1769488709743943690',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769489977358872757',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769497532307325162',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769498629457510486',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769496981192466627',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769500275335672212',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769502521762910432',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769503232295088497',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769503503750443226',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769503609706684655',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769459273937854527',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769509629262786958',
    winner: 'lowerThan25',
    category: 'Art'
  },
  {
    type: 'tweet',
    value: '1769509785727050195',
    winner: 'lowerThan25',
    category: 'Art'
  },
  
  













  

  { type: "tweet", value: "1768030136656368096", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1768225880265089133", finalist: 'finalist', finalistIndex: "1", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1768737265902076149", finalist: 'finalist', finalistIndex: "2", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769156836941291989", finalist: 'finalist', finalistIndex: "3", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769286577677602899", finalist: 'finalist', finalistIndex: "4", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769316198217621822", finalist: 'finalist', finalistIndex: "5", winner: "top25" , category: "Educational" },
  // {
  //   type: "image",
  //   winner: "top25" , finalist: 'finalist', finalistIndex: "6",
  //   category: "Educational", comment: "Watch on youtube", commentUrl: "https://youtu.be/n-ZwdZ9t14k",
  //   value:
  //     "https://i.ytimg.com/vi/n-ZwdZ9t14k/maxresdefault.jpg",
  // },
  { type: "tweet", value: "1770514978807705924", finalist: 'finalist', finalistIndex: "6", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769475900658131261", finalist: 'finalist', finalistIndex: "7", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769494094345109904", finalist: 'finalist', finalistIndex: "8", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769366942039617898", finalist: 'finalist', finalistIndex: "9", winner: "top25" , category: "Educational" },
  { type: "tweet", value: "1769501063512461493", finalist: 'finalist', finalistIndex: "10", winner: "top25" , category: "Educational" },


  { "type": "tweet", "value": "1767517928415490078", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1768050092966391939", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1768089319296868743", "winner": "lowerThan25", "category": "Educational" },
  // { "type": "tweet", "value": "1768110774977974423", "winner": "lowerThan25", "category": "Educational" },
  // {
  //   type: "image",
  //   winner: "lowerThan25" ,
  //   category: "Educational",
  //   comment: "Link",
  //   commentUrl: "https://pbs.twimg.com/media/GImD3aOawAAtcoU?format=jpg&name=medium",
  //   value:
  //     "https://pbs.twimg.com/media/GImD3aOawAAtcoU?format=jpg&name=medium",
  // },
  // the two above are duplicates that are also in other categories
  { "type": "tweet", "value": "1768290239838359565", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1768617701868462289", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1768996056438636567", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769028073003819232", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769349805669834864", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769462011216167057", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769469663421899201", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769090608478507432", "winner": "lowerThan25", "category": "IRL" },
  { "type": "tweet", "value": "1769475597187604790", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769479318323810415", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769481558875054387", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769489110782075291", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769506317876830337", "winner": "lowerThan25", "category": "Educational" },
  { "type": "tweet", "value": "1769526930699682265", "winner": "lowerThan25", "category": "Educational" },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Educational",
    // comment: "Rarible", commentUrl: "https://rarible.com/token/zksync/0xd477fb44966c9fc7e84f5ddd8d27da3edc8236d0:461",
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9iaWdpbnQuZnJhMS5jZG4uZGlnaXRhbG9jZWFuc3BhY2VzLmNvbS9iaWdpbnRfb3JpZ2luYWxzL2ltYWdlcy80NjEud2VicA==",
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Educational",
    // comment: "Rarible", commentUrl: "https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:427",
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbVJpYVM2dmc2TG8yaUxKaXUzOVhFZUdaWkI2NGl4Q0VqQ0tybVRpckZGSko0",
  },





  { type: "tweet", value: "1767294893968269493", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1767453905909403695", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1767914675407396931", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1768089319296868743", winner: "top25" , category: "Meme" },
  // { type: "tweet", value: "1768102627772936389", winner: "top25" , category: "Meme" },
  {
    type: "image",
    winner: "top25",
    category: "Meme",
    value:
      "https://pbs.twimg.com/media/GImP7SbWgAACqNW?format=jpg&name=large",
  },
  // { type: "tweet", value: "1768110774977974423", finalist: 'finalist', finalistIndex: "", winner: "top25" , category: "Meme" },
  {
    type: "image",
    winner: "top25",
    category: "Meme",
    finalist: 'finalist', finalistIndex: "1",
    comment: "Watch video on Twitter",
    commentUrl: "https://twitter.com/iamcIoud/status/1768110774977974423",
    value:
      "https://pbs.twimg.com/ext_tw_video_thumb/1768110737829097472/pu/img/jKxejGb73De-YOQy.jpg",
  },
  { type: "tweet", value: "1768467444480221680", finalist: 'finalist', finalistIndex: "2", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1768571821761478849", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1768703701836013904", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1768817234644730106", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769121532800905346", finalist: 'finalist', finalistIndex: "3", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769282387161293233", finalist: 'finalist', finalistIndex: "4", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769319788705431718", finalist: 'finalist', finalistIndex: "5", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769379796172283954", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769392624178487760", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769428427285610536", finalist: 'finalist', finalistIndex: "6", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769432520439763394", finalist: 'finalist', finalistIndex: "7", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1768789817469370580", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769496967111975256", finalist: 'finalist', finalistIndex: "8", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769503252918251548", finalist: 'finalist', finalistIndex: "9", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769510792611705204", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769508292416467337", finalist: 'finalist', finalistIndex: "10", winner: "top25" , category: "Meme" },
  { type: "tweet", value: "1769510982689128542", winner: "top25" , category: "Meme" },





  {
    type: 'tweet',
    value: '1767217202766266854',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767224150366838908',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767227712265961531',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767239793191366755',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Meme",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:279
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbVFEUjd2RVlNTTFyRFlWUWRjTmRlUWVTNXNBWXU2TmpHMzJVUXBMc0hNRmN0",
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Meme",
    // https://rarible.com/token/zksync/0xabf1fe6636b9271ac4c59a8193ab31589e512d5a:402
    value:
      "https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9pcGZzLnJhcmlibGV1c2VyZGF0YS5jb20vaXBmcy9RbVZpb3BGU1dabjczVTVoTGhaWVJ4WGVxRm5hc1FyTjVaZkp1VFdTVnE2WXhV",
  },
  {
    type: 'tweet',
    value: '1767240645918527864',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767250146738516113',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767285671079612806',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767303560075575376',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767311149320806606',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767313063496016255',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  // {
  //   type: 'tweet',
  //   value: '1767337571955384384',
  //   winner: 'lowerThan25',
  //   category: 'Meme'
  // },
  {
    type: "image",
    winner: "lowerThan25" ,
    category: "Meme",
    comment: "Link",
    commentUrl: "https://twitter.com/cvpfus_id/status/1767337571955384384",
    value:
      "https://i.imgur.com/NIhtfWd.png",
  },
  {
    type: 'tweet',
    value: '1767399214374400467',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767422958736445764',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767435323410448602',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767448528849436899',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767450089872847041',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767454016093741542',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767454320998670678',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767548131775004952',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767548325467979963',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767585032330526969',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767907960729002063',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767918782876639604',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767924616415129875',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767944545562661236',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1767954424960295256',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768024746665382303',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768102627772936389',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768109889186881933',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768111112703107201',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768129594736218286',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768162255601062079',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768158509731086534',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768251015524921446',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768252799001760147',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Meme",
    // https://drive.google.com/file/d/12GtcWBI-npulPgGWgdnbW-cHHyLIH5Vt/view
    value:
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbkb2G_GMvPfIzBOJ25o53CrFmYrsZnVuImD1GekgaTmJQPpM5A21drdYFeHL18-dWdKH8dJBUpocSnInsrTM8PsA8Y=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1768252340308516906',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768254456712552586',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768286833958379571',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768368919524626451',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768369742136672676',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768370601851584645',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768390612598796724',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768468064528453868',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768638768506905082',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768664925969236054',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768684252596666660',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768825426959286759',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768838926796537896',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768848737089257802',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768883405461311523',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768886660866212187',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768930443179569635',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768946365374099892',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768979992296222850',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768998143079932223',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769012577219096852',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769028073003819232',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769064765752479746',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Meme",
    // https://drive.google.com/file/d/12BZi7QyIde9FsEwDN7SpXXoZ69SB0kEB/view
    value:
      "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYHhuRXAjB_o0O6iNbqmcQ69FhXLB3l5qB0zyY9_HKBtUFYknCN7Ti8_exvoAk-QqyK-ui33Ax1V6m7nBl1URl3I9nKaA=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1769096589530796142',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769156378709647860',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769159626560606400',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769232008134443467',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769253246655504805',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769192615046476274',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769087343925846278',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769367808880841019',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769386671831756902',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769241379291701423',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769383865981063469',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769402382851711351',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769349805669834864',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769414154648170589',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769424682657456534',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769427067974615226',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769335760598286561',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769433937841922406',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769432750745120869',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769434793916150194',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769436141982466523',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769439806248165886',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769456507123351794',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769461341037740417',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769464927889101198',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769462913243242582',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769448456509173774',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769475708672246008',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769477628853932065',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769487654788223204',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769490564289102206',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769490773148598272',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769491932391301368',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769494552245571688',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: "image",
    winner: "lowerThan25",
    category: "Meme",
    // https://drive.google.com/drive/folders/1NOqG110sSqjNffPSB-PZXxRALvPBleP3
    value:
      "https://lh3.googleusercontent.com/fife/ALs6j_GFT1G6E_DyeH-2o7sRbnpgHhNkKn5TKtQeqEQpQwS1I4qDnxZ3eiRMKPBXB3S6hyqF_kht9E-OaWxStKRNzXvlOFkO_VBlJXw2n572w537iLPmnRDFYVChY3Eb-yijUwmK0Zz9Rkb--ke6XIqdvuSHfI5aoqGk7MU_W_7UArGNR-2y-zU-o6GiPOc65IlwgaQOwjUobhBvu_L3PTthBHkyaJ3V-1ireBFlOfnzJ41OetGzVUcBsgqeOvCbNGJs-Prwl900fdFQ8cfhxkFhI6dvS0OkOy_nd8Z0-8rk-8h3zitQn3gE7pe4muO_kcs4t8jNHbozDw8clpnHCNGi8bFDa__jxWEFm1hWpolKAx5QrymvcZd99dbJkzykV6VFWxfP3ocDZRuQfm0FVgHv7Inm_oPXAFFKEoCbNlZoC1XoSHQfcsI9rq_WTWE2y-bbKuFgYNMBIzx_dk1NCTAeHbKAAgYbDsIIPUqgcugNGT29rPxbMmX8s4PxzwDI3NVbtepMPCIT4ur0F83P1D3UZb1SZ7MrKgoidjNsMATOLpP3aK2tSe2WqMPAxUif0vI0BAfqe_T-CpH56NfVX3dIz7q9F0Y2I9HLfb8MWp91E5-jizPH7r_2gC9lRgruDrZFhSvWl8Pg8YDMWXfpBKohro1vwnShcHfRitpXzK6xOmZn5k7mEtNO5t8m5dZTbqiDvTEk5EeAioK-tb__6FKQxabCW1Ybet-kPTiI0jUSYct5ADMPnEPTdwvACQNu0UEVq-WxQBWJj2YYR_rOfPRbKjjaE5rssHL__wOk3QugzgKzFDbUJmJKrCfxMoz5HUTz6xRhz7ftPHOllgj8I2Bf68nQRUfZOIyznDVabTCRTGMIdY9DhIAbbQYxgfdaoqPEbTkgZrhqCFcdVzTUh642Od90NpQ3ixCp2CsF_sr6qdoqSFBLyfHPpJXDvxaqU3bN5JXmC3qaiN54ToJLo5wMC4Ibn0oaBkMU1xlpiluurbjnJMocxM9Quk3cHWIkwiv8LfHjFt5t69kZ8rmCsgoWX07zD_CXRCOqy71-9oKYA06LXFrN9H5UnbRI3Vy6tCm5lTr__hTV59dAi62SQeNrICgBeD4LzxGy7M_DjOk8ZNaCW7LX_EJwlXJg6_cN3gJlKdsX6a9zet0H-JzBby9U-3B2Y3T_xyj1FUAI4aTiYKEFwVKd3MKpBH-xYiBZDEvmtNRRQY3LbUkAH0CK0ekt7aRyCBZ6PbjjKWkr0yFtGhclpycDjVUkfhEhbJXZWsrTvEeErtu4VuamdW5ZNzpSwIFTKMM0D-uRnsU2Bj6v6Hp1mIAWETIBV62AVWhfX8LN08ewfC2g8BSeejmuOTc_5NtNhwA0Jpz97dfHWFqVXGu_nPn9B01T9mTWoSHCqndYQqPtvnwWatUh2Rp2yQN7hsg_1d8JRY73zKeFnE9nInB4cTm8-USbHP1NYJz5Q0qljn7Juc85Jqs-dn_T9pGOATxrSTqvR2qRO_BgV17S_ioYbbe4OW_vLES6wZCtSZ9CXqA8SnZ35tQggJEPRFSuFe9rLtS-Yhojdw2P7BI3qZJbQ7Lo2epEZHmYmgzHwdG6JnfeZq361DfNWU7CRhI-JNa7QPwsU5TXF8cdw8uH7Dt5l_5eB3zKFsyUsPiltnwkqnb8Bya-Ki59HwYI7QlRhjF3I6pISeR4_CDNjRKnc4Drc0A4hQLC4Q3zPuNLuL3D4c-EEgDyLRiwsweC6KY_YY8N2pxe3g=w3841-h2175",
  },
  {
    type: 'tweet',
    value: '1769507409439945130',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769422121522909607',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1769513449460204000',
    winner: 'lowerThan25',
    category: 'Meme'
  },
  {
    type: 'tweet',
    value: '1768946365374099892',
    winner: 'lowerThan25',
    category: 'Meme'
  }
];

