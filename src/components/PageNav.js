const PageNav = ({ curPageNumber, totalNumberOfPages, totalNumberOfEvents, numberPerPage, goToPrevPage, goToNextPage }) => {
    
    const startIndex = ((curPageNumber - 1) * numberPerPage) + 1;
    const endIndex = (startIndex + numberPerPage)-1;
    
    return (
	    <div className="page-navigation">
	    
	      <button
	        onClick={goToPrevPage}
	        disabled={curPageNumber === 1}
  	      >
	        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
	      </button>
	      <button
	        onClick={goToNextPage}
	        disabled={curPageNumber === totalNumberOfPages}
	      >
	        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
	      </button>
	      {curPageNumber === totalNumberOfPages
	        ? <p>{startIndex}-{totalNumberOfEvents} of {totalNumberOfEvents}</p>
	        : <p>{startIndex}-{endIndex} of {totalNumberOfEvents}</p>
	      }
	    </div>    
    )
}

export default PageNav;
