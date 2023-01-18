import { useState } from "react";
import { Link } from "react-router-dom";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { UserPreview } from "../components/userPreview/UserPreview";
import { UserReposAndGists } from "../components/userReposAndGists/UserReposAndGists";
import { SearchIssues } from "../components/searchIssues/SearchIssues";
import { DependentQueries } from "../components/dependentQueries/DependentQueries";
import { QueryingFilteredData } from "../components/queryingFilteredData/QueryingFilteredData";
import { StatusSelect } from "../components/StatusSelect";
import { SearchQueryExample } from "../components/searchQueryExample/SearchQueryExample";
import { ErrorHandling } from "../components/errorHandling/ErrorHandling";
import { ManualQueryInvalidation } from "../components/manualQueryInvalidation/ManualQueryInvalidation";
import { QueryFilters } from "../components/queryFilters/QueryFilters";
import { FetchingStates } from "../components/fetchingStates/FetchingStates";
import { PlaceholderData } from "../components/placeholderData/PlaceholderData";
import { InitialData } from "../components/initialData/InitialData";
import { PreloadingData } from "../components/preloadingData/PreloadingData";
import { Mutations } from "../components/mutations/Mutations";
import { Pagination } from "../components/pagination/Pagination";
import { InfiniteQuery } from "../components/infiniteQuery/InfiniteQuery";
import { RenderOptimizations } from "../components/renderOptimizations/RenderOptimizations";

export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);

  return (
    <div>
      <main>
        <section>
          {/* <UserPreview></UserPreview> */}
          {/* <UserReposAndGists /> */}
          {/* <SearchIssues /> */}
          {/* <DependentQueries /> */}
          {/* <QueryingFilteredData /> */}
          {/* <SearchQueryExample /> */}
          {/* <ErrorHandling /> */}
          {/* <ManualQueryInvalidation /> */}
          {/* <QueryFilters /> */}
          {/* <FetchingStates /> */}
          {/* <PlaceholderData userId="u_2" /> */}
          {/* <InitialData /> */}
          {/* <PreloadingData /> */}
          {/* <Mutations /> */}
          {/* <Pagination /> */}
          {/* <InfiniteQuery /> */}
          {/* <RenderOptimizations /> */}

          {/* START comment for making examples above working */}
          <IssuesList
            labels={labels}
            status={status}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
          {/* END comment for making examples above working */}
        </section>
        <aside>
          {/* START comment for making examples above working */}
          <LabelList
            selected={labels}
            toggle={(label) => {
              setLabels((currentLabels) =>
                currentLabels.includes(label)
                  ? currentLabels.filter(
                      (currentLabel) => currentLabel !== label
                    )
                  : currentLabels.concat(label)
              );
              setPageNum(1);
            }}
          />
          {/* END comment for making examples above working */}
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPageNum(1);
            }}
          />
          <hr />
          <Link className="button" to="/add">
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}
