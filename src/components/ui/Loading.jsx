import React from 'react'

const Loading = ({ className = "", type = "default" }) => {
  if (type === "sessions") {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4 shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/2 shimmer"></div>
              </div>
              <div className="h-6 w-16 bg-gradient-to-r from-primary/30 to-secondary/30 rounded shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-full shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-4/5 shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "speakers") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full mb-4 shimmer"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4 mx-auto shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/2 mx-auto shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-2/3 mx-auto shimmer"></div>
              </div>
              <div className="mt-4 space-y-2 w-full">
                <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-full shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-4/5 shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gradient-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-gradient-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-gradient-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}

export default Loading