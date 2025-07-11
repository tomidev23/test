import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [sort, setSort] = useState(urlParams.get('sort') || 'newest');
  const [perPage, setPerPage] = useState(Number(urlParams.get('perPage')) || 10);
  const [currentPage, setCurrentPage] = useState(Number(urlParams.get('page')) || 1);
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // ✅ untuk menghitung total data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await 
        fetch(
          `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

    const ideas = json.data.map((item) => ({
  id: item.id,
  title: item.title,
  date: new Date(item.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  medium_image: item.medium_image,
  small_image: item.small_image,
}));



        setPosts(ideas);
        setTotalItems(json.meta?.total || 0); 
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Gagal memuat data dari server.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, perPage, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("sort", sort);
    params.set("perPage", perPage);
    params.set("page", currentPage);
    window.history.replaceState({}, "", `?${params}`);
  }, [sort, perPage, currentPage]);

  const totalPages = Math.ceil(totalItems / perPage); 

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const startIndex = (currentPage - 1) * perPage;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(perPage)].map((_, i) => (
            <div key={i} className="rounded-lg shadow-md bg-white h-full">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
              <div className="p-4">
                <div className="h-4 w-1/3 bg-gray-200 animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 animate-pulse mb-1" />
                <div className="h-4 bg-gray-200 animate-pulse mb-1" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 text-red-700 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium">
            {startIndex + 1}-{Math.min(startIndex + perPage, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> posts
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <label htmlFor="perPage" className="text-sm text-gray-600 mr-2">
              Show:
            </label>
            <select
              id="perPage"
              value={perPage}
              onChange={(e) => {
                setCurrentPage(1);
                setPerPage(Number(e.target.value));
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => {
                setCurrentPage(1);
                setSort(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-12">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
          >
            &laquo;
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
          >
            &lsaquo;
          </button>

          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === page
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            )
          )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
          >
            &rsaquo;
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
