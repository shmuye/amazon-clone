
const sidbarLinks = [
  {
    category: "Digital Content & Devices",
    link: "Prime Video",
    childLinks: [
      "All videos", "Included with Prime", "Prime Video Channels"
    ]
  },

   {
    category: "Digital Content & Devices",
    link: "Amazon AppStore",
    childLinks: [
      "Appstore Home", "Fire Tablet Apps", "Manage Apps"
    ]
  },

   {
    category: "Digital Content & Devices",
    link: "Amazon Music",
    childLinks: [
      "Amazon Music Unlimited", "Free Streaming Music", "Podcasts"
    ]
  }
]
const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 w-[400px] min-h-[500px] text-black bg-white shadow-md z-100">
      <h1 className="bg-slate-800 py-2 text-xl text-white pl-5 font-bold">Hello Name</h1>
      {
        sidbarLinks.map((link) => (
          <div className="pl-5"> 
            <h1 className="font-bold">
              {link.category}
            </h1>
            <ul className="flex flex-col">
              {
                link.childLinks.map((child) => (
                  <li>{child}</li>
                ))
              }
            </ul>
          </div>
        ))
      }

    </nav>
  )
}

export default Sidebar