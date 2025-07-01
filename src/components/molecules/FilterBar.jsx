import React from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({
  tracks = [],
  topics = [],
  speakers = [],
  selectedTrack,
  selectedTopic,
  selectedSpeaker,
  onTrackChange,
  onTopicChange,
  onSpeakerChange,
  onClearFilters,
  hasActiveFilters
}) => {
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderColor: state.isFocused ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      minHeight: '44px',
      boxShadow: state.isFocused ? '0 0 0 1px rgba(139, 92, 246, 0.5)' : 'none',
      backdropFilter: 'blur(4px)',
      '&:hover': {
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      zIndex: 50
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0.5rem'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'rgba(139, 92, 246, 0.3)' 
        : state.isFocused 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'transparent',
      color: state.isSelected ? '#ffffff' : '#cbd5e1',
      borderRadius: '0.5rem',
      margin: '0.125rem 0',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#94a3b8'
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffffff'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#94a3b8',
      '&:hover': {
        color: '#ffffff'
      }
    })
  }

  const formatOptionLabel = (option, { context }) => {
    if (context === 'value') {
      return (
        <div className="flex items-center gap-2">
          <span>{option.label}</span>
          {option.count && (
            <span className="text-xs text-slate-400">({option.count})</span>
          )}
        </div>
      )
    }
    return (
      <div className="flex items-center justify-between w-full">
        <span>{option.label}</span>
        {option.count && (
          <span className="text-xs text-slate-400 ml-2">({option.count})</span>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-surface/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Filter Label */}
          <div className="flex items-center gap-2 text-white font-semibold min-w-fit">
            <ApperIcon name="Filter" size={18} />
            <span>Filter Sessions:</span>
          </div>

          {/* Filter Controls */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Track Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Track
              </label>
              <Select
                value={selectedTrack}
                onChange={onTrackChange}
                options={tracks}
                placeholder="All tracks"
                isClearable
                isSearchable
                styles={customSelectStyles}
                formatOptionLabel={formatOptionLabel}
                className="text-sm"
              />
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Topic
              </label>
              <Select
                value={selectedTopic}
                onChange={onTopicChange}
                options={topics}
                placeholder="All topics"
                isClearable
                isSearchable
                styles={customSelectStyles}
                formatOptionLabel={formatOptionLabel}
                className="text-sm"
              />
            </div>

            {/* Speaker Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Speaker
              </label>
              <Select
                value={selectedSpeaker}
                onChange={onSpeakerChange}
                options={speakers}
                placeholder="All speakers"
                isClearable
                isSearchable
                styles={customSelectStyles}
                formatOptionLabel={formatOptionLabel}
                className="text-sm"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-lg transition-all duration-200 min-w-fit"
            >
              <ApperIcon name="X" size={16} />
              Clear All
            </motion.button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex flex-wrap gap-2">
              {selectedTrack && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary/20 text-primary-light rounded-full">
                  Track: {selectedTrack.label}
                </span>
              )}
              {selectedTopic && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-secondary/20 text-secondary-light rounded-full">
                  Topic: {selectedTopic.label}
                </span>
              )}
              {selectedSpeaker && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-accent/20 text-accent-light rounded-full">
                  Speaker: {selectedSpeaker.label}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default FilterBar