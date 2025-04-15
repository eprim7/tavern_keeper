import Header from "../../components/Header/Header";
import styles from "../Community/Community.module.css";
import { BsSearch } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import React, {useState, useRef} from 'react';
import CommunityGrid from "../../components/CommunityGrid/CommunityGrid";
import { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { getPublicWorlds } from "../../api/world_accessor";
import { MdOutlineClose } from "react-icons/md";

function Community() {
  //var for dropdown
  const [open, setOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  //reference to dropdown menu element
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const submenuRef = useRef(null);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(false);
  const openMenu = () => {
    setOpen(!open);
    if(genreOpen){
      setGenreOpen(false);
    }
  }
  const openSubMenu = () => {
    setGenreOpen(!genreOpen);
    console.log("opening sub menu")
  }
  const filterByGenre = (genre) =>  {
    console.log("filtering by: " + genre);
    //setCommunityData(allCommunityData.filter(world => world.genre == genre));
    filterPublicWorlds(genre);
    setOpen(false);
    setGenreOpen(false);
    setFiltered(true);
  }
  const filterByNew = () => {
    console.log("filtering by: new");
    const sorted = [...allCommunityData].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    setCommunityData(sorted);
    setOpen(false);
    setGenreOpen(false);
    setFiltered(true);
  }
  const filterByLikes = () => {
    console.log("filtering by: likes");
    const sorted = [...allCommunityData].sort((a, b) => b.likes - a.likes);
    setCommunityData(sorted);
    setOpen(false);
    setGenreOpen(false);
    setFiltered(true);
  }
  function FilterDropDown () {
    //add more styling
    return (
        <div className={open ? styles.filtermenu : styles.filtermenuinactive} ref={dropdownRef}>
            <ul className={styles.dropdownbody}>
              <DropDownItem name="Date Created" onClick={filterByNew}/>
              <DropDownItem name="Genre" onClick={openSubMenu} />
              <DropDownItem name="Popularity" onClick={filterByLikes}/>
            </ul>
        </div>
    );
  }
  function DropDownItem (props) {
    //maybe add an icon later
    return (
      <li className={styles.dropdownitem} onClick={props.onClick}>
        {props.name}
        {props.name == "Genre" ? <RiArrowDropDownLine /> : null}
      </li>
    );
  }
  function FilterSubMenu () {
    //hard coded for now
    return(
      <div className={genreOpen ? styles.filtersubmenu : styles.filtersubmenuinactive} ref={submenuRef}>
        <ul className={styles.submenubody}>
          <SubDropDownItem name="Fantasy" />
          <SubDropDownItem name="Sci-Fi" />
          <SubDropDownItem name="Romance" />
          <SubDropDownItem name="Mystery" />
          <SubDropDownItem name="Horror"/>
          <SubDropDownItem name="Thriller" />
          <SubDropDownItem name="Nonfiction" />
        </ul>
      </div>
    )
  }
  function SubDropDownItem ({name}) {
    return (
      <li className={styles.submenuitem}>
        <button className={styles.innersubmenuitem} onClick={() => {filterByGenre(name); console.log("Genre button clicked");}}>
          {name}
        </button>
      </li>
    );
  }
  //Close dropdown when clicking outside of the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
        //close menu when clicking on toggle button also
        if (!dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target) && !submenuRef.current.contains(event.target)) {
            setOpen(false);
            setGenreOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }

  });
  
  //community data
  const [allCommunityData, setAllCommunityData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  async function fetchPublicWorlds() {
    const publicWorlds = await getPublicWorlds();
    if(publicWorlds){
        setCommunityData(publicWorlds);
        setAllCommunityData(publicWorlds);
    }
  }
  useEffect(() => {
    if (allCommunityData.length === 0) {
      fetchPublicWorlds();
    }
  }, []);
  async function searchPublicWorlds(search) {
    const publicWorlds = await getPublicWorlds(null, search);
    if(publicWorlds){
      setCommunityData(publicWorlds);
    }
  }
  async function filterPublicWorlds(genre) {
    const publicWorlds = await getPublicWorlds(genre, null);
    if(publicWorlds){
      setCommunityData(publicWorlds);
    }
  }
  
    
  //pagination vars
  //takes a slice of the full list of data elements and display it on the communitygrid component
  //each time a new page clicked, the slice of data should change
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = communityData.slice(indexOfFirstItem, indexOfLastItem);

  //math.ceil for decimals, round up
  const totalPages = Math.ceil(communityData.length / itemsPerPage);
  //component that returns buttons corresponding to each page
  const Pagination = ({totalPages}) => {
    let pages = [];
    for(let i = 1; i <= totalPages; i++){
      pages.push(i);
    }
    return(
      <div>
        {pages.map((page, index) => {
          return <button key={index} className={currentPage == page ? styles.currentPageButton : styles.pageButton} onClick={() => setCurrentPage(page)}>{page}</button>
        })}
      </div>
    );
  }

  const updatePage = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }

  
  const handleInput = (event) => {
    setSearch(event.target.value);
  }
  const searchWorlds = () => {
    console.log(search);
    if(search.trim() == ''){
      fetchPublicWorlds();
    } else {
      //const filteredData = allCommunityData.filter(world => world.title.toLowerCase().includes(search.toLowerCase()));
      //setCommunityData(filteredData);
      searchPublicWorlds(search);
    }
    
  }
  const removeFilter = () => {
    setCommunityData(allCommunityData);
    setFiltered(false);
  }
  return (
    <>
      <Header />
      <h1 className={styles.h1}>Community Board</h1>
      <div className={styles.controlsWrapper}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search Worlds"
            className={styles.search}
            onChange={handleInput}
          />
          <button className={styles.button} onClick={searchWorlds}>
            <BsSearch />
          </button>
        </div>
        <div>
          <button className={styles.filter} onClick={openMenu} ref={buttonRef}>
            <CiFilter style={{width: '2.5em', height: '2.5em'}}/>
          </button>
        </div>
        <div>
          <button className={filtered ? styles.closefilter : styles.closefilterinactive} onClick={removeFilter}>
            <MdOutlineClose />
          </button>
        </div>
      </div>
      <FilterDropDown />
      <FilterSubMenu />
      <CommunityGrid communityData={currentItems} />
      
      <div className={styles.paginationWrapper}>
        <Pagination totalPages={totalPages}/>
        <div className={styles.selectorWrapper}>
          <label>Worlds Per Page: </label>
          <select onChange={updatePage}>
            <option value="9">9</option>
            <option value="18">18</option>
            <option value="27">27</option>
          </select> 
        </div>
      </div>
    </>
  );
}


export default Community;

