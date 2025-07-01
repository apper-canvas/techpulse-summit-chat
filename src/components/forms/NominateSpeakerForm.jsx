import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { speakerFormService } from '@/services/api/speakerFormService'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const NominateSpeakerForm = ({ onClose, onSuccess }) => {
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
      await speakerFormService.submitNomination(data)
      reset()
      onSuccess()
    } catch (error) {
      toast.error(error.message || 'Failed to submit nomination')
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
                  Nominate a Speaker
                </h2>
                <p className="text-slate-300">
                  Recommend an expert who would inspire our community
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
              {/* Your Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    icon="User"
                    error={errors.nominatorName?.message}
                    {...register('nominatorName', { 
                      required: 'Your name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  <Input
                    label="Your Email"
                    type="email"
                    icon="Mail"
                    error={errors.nominatorEmail?.message}
                    {...register('nominatorEmail', { 
                      required: 'Your email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="Your Relationship to Nominee"
                    icon="Users"
                    placeholder="e.g., Colleague, Former teammate, Industry connection"
                    error={errors.relationship?.message}
                    {...register('relationship', { 
                      required: 'Relationship is required',
                      minLength: { value: 3, message: 'Relationship must be at least 3 characters' }
                    })}
                  />
                </div>
              </div>

              {/* Nominee Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Nominee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nominee Name"
                    icon="UserCheck"
                    error={errors.nomineeName?.message}
                    {...register('nomineeName', { 
                      required: 'Nominee name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                  />
                  <Input
                    label="Nominee Email"
                    type="email"
                    icon="Mail"
                    error={errors.nomineeEmail?.message}
                    {...register('nomineeEmail', { 
                      required: 'Nominee email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Job Title"
                    icon="Briefcase"
                    error={errors.nomineeJobTitle?.message}
                    {...register('nomineeJobTitle', { 
                      required: 'Job title is required',
                      minLength: { value: 2, message: 'Job title must be at least 2 characters' }
                    })}
                  />
                  <Input
                    label="Company"
                    icon="Building"
                    error={errors.nomineeCompany?.message}
                    {...register('nomineeCompany', { 
                      required: 'Company is required',
                      minLength: { value: 2, message: 'Company must be at least 2 characters' }
                    })}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="LinkedIn Profile (Optional)"
                    type="url"
                    icon="Link"
                    error={errors.nomineeLinkedin?.message}
                    {...register('nomineeLinkedin', {
                      pattern: {
                        value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                        message: 'Please enter a valid LinkedIn profile URL'
                      }
                    })}
                  />
                </div>
              </div>

              {/* Nomination Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Why This Speaker?</h3>
                <div className="space-y-4">
                  <Input
                    label="Suggested Topic/Expertise Area"
                    icon="Lightbulb"
                    placeholder="e.g., AI/ML, Cloud Architecture, Leadership, Product Strategy"
                    error={errors.suggestedTopic?.message}
                    {...register('suggestedTopic', { 
                      required: 'Suggested topic is required',
                      minLength: { value: 5, message: 'Topic must be at least 5 characters' }
                    })}
                  />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Why should they speak at TechPulse Summit?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us about their expertise, achievements, unique perspective, or previous speaking experience..."
                      {...register('nominationReason', { 
                        required: 'Nomination reason is required',
                        minLength: { value: 100, message: 'Reason must be at least 100 characters' }
                      })}
                    />
                    {errors.nominationReason && (
                      <p className="text-red-400 text-sm mt-1">{errors.nominationReason.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                      placeholder="Any additional information about the nominee or suggested presentation..."
                      {...register('additionalNotes')}
                    />
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
                  {loading ? 'Submitting...' : 'Submit Nomination'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default NominateSpeakerForm