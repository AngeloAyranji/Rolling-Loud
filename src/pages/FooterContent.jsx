import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

function FooterContent({ name }) {
  const { data, loading } = useFetch("api/aboutus");

  return (
    <>
      {!loading && data ? (
        <div className="w-full mx-auto flex justify-center items-center">
          <div className="max-w-[1400px] w-full">
            <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
              >
                <Link to="/">Home</Link>
                <Link to={`/footer/about`}>About Us</Link>
              </Breadcrumbs>
              <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
                {name}
              </h2>
              <div className="h-[2px] w-full bg-primary"></div>
              <ReactMarkdown className="prose text-secondary-content text-lg tracking-wide min-w-full">
                {data.attributes?.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default FooterContent;
