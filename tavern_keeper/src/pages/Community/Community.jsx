import Header from "../../components/Header/Header";
import styles from "../Community/Community.module.css";
import { BsSearch } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import React, {useState, useRef} from 'react';
import CommunityGrid from "../../components/CommunityGrid/CommunityGrid";
import { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function Community() {
  //var for dropdown
  const [open, setOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  //reference to dropdown menu element
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const submenuRef = useRef(null);
  const openMenu = () => {
    setOpen(!open);
    if(genreOpen){
      setGenreOpen(false);
    }
  }
  const openSubMenu = () => {
    setGenreOpen(!genreOpen);
  }
  
  function FilterDropDown () {
    //add more styling
    return (
        <div className={open ? styles.filtermenu : styles.filtermenuinactive} ref={dropdownRef}>
            <ul className={styles.dropdownbody}>
              <DropDownItem name="Date Created" />
              <DropDownItem name="Genre" onClick={openSubMenu} />
              <DropDownItem name="Popularity" />
              
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
          <SubDropDownItem name="Horror" />
          <SubDropDownItem name="Thriller" />
          <SubDropDownItem name="Nonfiction" />
        </ul>
      </div>
    )
  }
  function SubDropDownItem (props) {
    return (
      <li className={styles.submenuitem}>
        {props.name}
      </li>
    );
  }
  //Close dropdown when clicking outside of the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
        //close menu when clicking on toggle button also
        if (!dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setOpen(false);
            setGenreOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }

  });
  const [genreData, setGenreData] = useState({"name": "dummyGenres",
    "items": [
      {"id": 1, "name": "Fantasy"},
      {"id": 2, "name": "Sci-Fi"},
      {"id": 3, "name": "Romance"},
      {"id": 4, "name": "Mystery"},
      {"id": 5, "name": "Horror"},
      {"id": 6, "name": "Thriller"},
      {"id": 7, "name": "Non-Fiction"},
    ]
  })
  //community data, dummy data for now
  const [communityData, setCommunityData] = useState({"name": "dummyWorlds",
    "items": [
      {"id": 1, "name": "World 1", "author": "john", "genre": "fantasy"},
      {"id": 2, "name": "World 2", "author": "jane", "genre": "sci-fi"},
      {"id": 3, "name": "World 3", "author": "jack", "genre": "romance"},
      {"id": 4, "name": "World 4", "author": "james", "genre": "biography"},
      {"id": 5, "name": "World 5", "author": "mark", "genre": "horror"},
      {"id": 6, "name": "World 6", "author": "lewis", "genre": "thriller"},
      {"id": 7, "name": "World 7", "author": "randy", "genre": "action"},
      {"id": 8, "name": "World 8", "author": "matt", "genre": "adventure"},
      {"id": 9, "name": "World 9", "author": "fred", "genre": "grimdark"},
      {"id": 10, "name": "World 10", "author": "jerry", "genre": "mystery"},
    ]});
    
  //pagination vars
  //takes a slice of the full list of data elements and display it on the communitygrid component
  //each time a new page clicked, the slice of data should change
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = communityData.items.slice(indexOfFirstItem, indexOfLastItem);

  //math.ceil for decimals, round up
  const totalPages = Math.ceil(communityData.items.length / itemsPerPage);
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
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
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
          />
          <button className={styles.button}>
            <BsSearch />
          </button>
        </div>
        <div>
          <button className={styles.filter} onClick={openMenu} ref={buttonRef}>
            <CiFilter style={{width: '2.5em', height: '2.5em'}}/>
          </button>
        </div>
      </div>
      <FilterDropDown />
      <FilterSubMenu/>
      <CommunityGrid communityData={currentItems} />
      
      <div className={styles.paginationWrapper}>
        <Pagination totalPages={totalPages}/>
        <div className={styles.selectorWrapper}>
          <label>Worlds Per Page:</label> <input type="number" value={itemsPerPage} className={styles.selector} min="1" onChange={updatePage} max={communityData.items.length}/>
        </div>
      </div>
    </>
  );
}


export default Community;

