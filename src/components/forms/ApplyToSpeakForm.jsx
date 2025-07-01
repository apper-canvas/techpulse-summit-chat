import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { speakerFormService } from '@/services/api/speakerFormService'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ApplyToSpeakForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await speakerFormService.submitApplication(data)
      reset()
      onSuccess()
    } catch (error) {
      toast.error(error.message || 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold font-display text-white mb-2">
                  Apply to Speak
                </h2>
                <p className="text-slate-300">
                  Share your expertise with the TechPulse Summit community
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-slate-300" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    icon="User"
                    error={errors.firstName?.message}
                    {...register('firstName', { 
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' }
                    })}
                  />
                  <Input
                    label="Last Name"
                    icon="User"
                    error={errors.lastName?.message}
                    {...register('lastName', { 
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                    })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Email"
                    type="email"
                    icon="Mail"
                    error={errors.email?.message}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <Input
label="Phone"
                    type="tel"
                    icon="Phone"
                    error={errors.phone?.message}
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[1-9][\d]{0,15}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Job Title"
                    icon="Briefcase"
                    error={errors.jobTitle?.message}
                    {...register('jobTitle', { 
                      required: 'Job title is required',
                      minLength: { value: 2, message: 'Job title must be at least 2 characters' }
                    })}
                  />
                  <Input
                    label="Company"
                    icon="Building"
                    error={errors.company?.message}
                    {...register('company', { 
                      required: 'Company is required',
                      minLength: { value: 2, message: 'Company must be at least 2 characters' }
                    })}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="LinkedIn Profile"
                    type="url"
                    icon="Link"
                    error={errors.linkedin?.message}
                    {...register('linkedin', {
                      pattern: {
                        value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                        message: 'Please enter a valid LinkedIn profile URL'
                      }
                    })}
                  />
                </div>
              </div>

              {/* Speaking Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Speaking Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Presentation Title"
                    icon="FileText"
                    error={errors.presentationTitle?.message}
                    {...register('presentationTitle', { 
                      required: 'Presentation title is required',
                      minLength: { value: 10, message: 'Title must be at least 10 characters' }
                    })}
                  />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Presentation Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                      placeholder="Describe your presentation topic, key takeaways, and target audience..."
                      {...register('description', { 
                        required: 'Description is required',
                        minLength: { value: 100, message: 'Description must be at least 100 characters' }
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Speaking Experience
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us about your previous speaking experience, conferences, workshops, etc..."
                      {...register('experience', { 
                        required: 'Speaking experience is required',
                        minLength: { value: 50, message: 'Experience must be at least 50 characters' }
                      })}
                    />
                    {errors.experience && (
                      <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={loading ? "Loader2" : "Send"}
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ApplyToSpeakForm