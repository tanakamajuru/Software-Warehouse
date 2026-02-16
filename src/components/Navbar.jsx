import { Search, Heart, GitCompare, ShoppingBag, Settings, Menu, DollarSign } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">eCommax</span>
            </div>
          </div>

          {/* Center Section - Shop Now and Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-4">
              {/* Shop Now Button */}
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Menu className="h-4 w-4" />
                <span>Shop Now</span>
              </button>

              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ENTER YOUR KEYWORD"
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                {/* Search Trending */}
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">SEARCH TRENDING:</span>
                  <span className="ml-2 space-x-4">
                    <a href="#" className="hover:text-blue-600 transition-colors">Audio Apps</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Business Systems</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Mobile Solutions</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Smart Tools</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Icons and Price */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* Compare */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <GitCompare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>

            {/* Price Display */}
            <button className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <DollarSign className="h-4 w-4 text-gray-700" />
              <span className="font-medium text-gray-900">0.00</span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
