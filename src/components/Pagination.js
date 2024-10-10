const PageNav = ({ curPageNumber, totalNumberOfPages, totalNumberOfEvents, numberPerPage, goToPrevPage, goToNextPage }) => {
    
    const startIndex = ((curPageNumber - 1) * numberPerPage) + 1;
    const endIndex = (startIndex + numberPerPage)-1;
    
    return (
	    <div id="page-navigation">
	    
	      <button
	        onClick={goToPrevPage}
	        disabled={curPageNumber === 1}
  	      >prev.
	      </button>

	      {curPageNumber === totalNumberOfPages
	        ? <p>showing {startIndex}-{totalNumberOfEvents} of {totalNumberOfEvents}</p>
	        : <p>showing {startIndex}-{endIndex} of {totalNumberOfEvents}</p>
	      }
	
	      <button
	        onClick={goToNextPage}
	        disabled={curPageNumber === totalNumberOfPages}
	      >next
	      </button>
	    
	    </div>    
    )
}

export default PageNav;
