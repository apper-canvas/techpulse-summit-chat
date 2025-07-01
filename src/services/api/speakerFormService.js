// Speaker form submission service
// Handles speaker applications and nominations

const speakerFormService = {
  async submitApplication(applicationData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate random success/failure for demo purposes
    const shouldSucceed = Math.random() > 0.1 // 90% success rate
    
    if (!shouldSucceed) {
      throw new Error('Failed to submit application. Please try again.')
    }
    
    // Generate a submission ID for confirmation
    const submissionId = Math.random().toString(36).substr(2, 9).toUpperCase()
    
    console.log('Speaker Application Submitted:', {
      submissionId,
      timestamp: new Date().toISOString(),
      data: applicationData
    })
    
    return {
      success: true,
      submissionId,
      message: 'Your speaker application has been submitted successfully!',
      nextSteps: 'Our team will review your application and contact you within 5-7 business days.'
    }
  },

  async submitNomination(nominationData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Simulate random success/failure for demo purposes
    const shouldSucceed = Math.random() > 0.15 // 85% success rate
    
    if (!shouldSucceed) {
      throw new Error('Failed to submit nomination. Please try again.')
    }
    
    // Generate a submission ID for confirmation
    const submissionId = Math.random().toString(36).substr(2, 9).toUpperCase()
    
    console.log('Speaker Nomination Submitted:', {
      submissionId,
      timestamp: new Date().toISOString(),
      data: nominationData
    })
    
    return {
      success: true,
      submissionId,
      message: 'Speaker nomination submitted successfully!',
      nextSteps: 'We will reach out to the nominated speaker and keep you updated on the process.'
    }
  }
}

export { speakerFormService }