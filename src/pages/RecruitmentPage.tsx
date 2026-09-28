import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { supabase } from '../lib/supabase';
import { BRANCHES, YEARS, DOMAINS, DOMAIN_SKILLS } from '../data/recruitmentData';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function RecruitmentPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    enrollment_number: '',
    branch: '',
    other_branch: '',
    year: '',
    whatsapp_number: '',
    college_email: '',
    first_preference: '',
    second_preference: '',
    skills: [] as string[],
    has_camera: '',
    previous_club_experience: 'No',
    club_names: '',
    portfolio_link: '',
    additional_info: ''
  });

  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update available skills when preferences change
  useEffect(() => {
    const selectedDomains = [formData.first_preference, formData.second_preference].filter(Boolean);
    const skills = new Set<string>();
    
    selectedDomains.forEach(domain => {
      if (DOMAIN_SKILLS[domain]) {
        DOMAIN_SKILLS[domain].forEach(skill => skills.add(skill));
      }
    });

    setAvailableSkills(Array.from(skills));
    
    // Remove skills that are no longer available
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skills.has(skill))
    }));
  }, [formData.first_preference, formData.second_preference]);

  const showCameraQuestion = formData.first_preference === 'Videography & Photography' || formData.second_preference === 'Videography & Photography';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('recruitment_applications')
        .insert([{
          full_name: formData.full_name,
          enrollment_number: formData.enrollment_number,
          branch: formData.branch === 'Other' ? formData.other_branch : formData.branch,
          year: formData.year,
          whatsapp_number: formData.whatsapp_number,
          college_email: formData.college_email,
          first_preference: formData.first_preference,
          second_preference: formData.second_preference || null,
          skills: formData.skills,
          has_camera: showCameraQuestion ? formData.has_camera : null,
          previous_club_experience: formData.previous_club_experience === 'Yes',
          club_names: formData.previous_club_experience === 'Yes' ? formData.club_names : null,
          portfolio_link: formData.portfolio_link || null,
          additional_info: formData.additional_info || null
        }]);

      if (submitError) throw submitError;

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0B1020] text-white selection:bg-primary/30 flex flex-col relative overflow-hidden">
        <Navbar />
        
        {/* Subtle background glow similar to the form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-green-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        
        <div className="flex-grow flex items-center justify-center p-4 pt-20 relative z-10">
          <div className="max-w-lg w-full bg-[#111827]/60 backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-12 text-center shadow-[0_0_40px_rgba(34,197,94,0.15)] relative overflow-hidden">
            {/* Added a stronger green glow behind the icon inside the card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-green-500/20 blur-[60px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                {/* Glow directly behind the icon */}
                <div className="absolute inset-0 bg-green-500/20 blur-[20px] rounded-full"></div>
                <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Application Submitted Successfully</h2>
              <p className="text-lg text-gray-300 mb-10 font-light">
                Thank you for applying to the Mathematics Club.
              </p>
              <a 
                href="https://chat.whatsapp.com/L0dMKzFcDsgIsWhCa9Xsuj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-primary hover:bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5"
              >
                Join Recruitment WhatsApp Group
              </a>
              <Link to="/" className="inline-block mt-8 text-sm text-gray-400 hover:text-white transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Join the Team</h1>
            <p className="text-xl text-gray-400">Fill out the form below to apply for the Mathematics Club.</p>
          </div>

          <div className="bg-[#111827]/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-[0_0_40px_rgba(37,99,235,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[80px] pointer-events-none"></div>
            <div className="relative z-10">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-8">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-gray-800 pb-2 text-white">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enrollment Number *</label>
                    <input 
                      type="text" 
                      name="enrollment_number"
                      required
                      value={formData.enrollment_number}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Enter your enrollment number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Branch *</label>
                    <select 
                      name="branch"
                      required
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select Branch</option>
                      {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {formData.branch === 'Other' && (
                      <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Specify Branch *</label>
                        <input 
                          type="text" 
                          name="other_branch"
                          required
                          value={formData.other_branch}
                          onChange={handleChange}
                          className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Enter your branch name"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                    <select 
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select Year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-700 bg-[#1f2937]/50 text-gray-400 text-sm">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        name="whatsapp_number"
                        required
                        pattern="[0-9]{10}"
                        title="10 digit mobile number"
                        value={formData.whatsapp_number}
                        onChange={handleChange}
                        className="flex-1 min-w-0 bg-[#0a0f1d] border border-gray-700 rounded-none rounded-r-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="10 digit number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">College Email ID *</label>
                    <input 
                      type="email" 
                      name="college_email"
                      required
                      value={formData.college_email}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="example@mitsgwl.ac.in"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-gray-800 pb-2 text-white">Domain Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Preference *</label>
                    <select 
                      name="first_preference"
                      required
                      value={formData.first_preference}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select Domain</option>
                      {DOMAINS.map(d => <option key={d} value={d} disabled={d === formData.second_preference}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Second Preference (Optional)</label>
                    <select 
                      name="second_preference"
                      value={formData.second_preference}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select Domain</option>
                      {DOMAINS.map(d => <option key={d} value={d} disabled={d === formData.first_preference}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {availableSkills.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Skills based on your preferences</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0a0f1d] p-4 rounded-lg border border-gray-800">
                      {availableSkills.map(skill => (
                        <label key={skill} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5">
                            <input
                              type="checkbox"
                              checked={formData.skills.includes(skill)}
                              onChange={() => handleSkillToggle(skill)}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-gray-600 rounded bg-[#111827] peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                {showCameraQuestion && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Do you have access to a camera that you can bring for club events? *</label>
                    <select 
                      name="has_camera"
                      required={showCameraQuestion}
                      value={formData.has_camera}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Occasionally / Can Arrange">Occasionally / Can Arrange</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Experience & Portfolio */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b border-gray-800 pb-2 text-white">Experience & Additional Info</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Previous Club Experience? *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="previous_club_experience" 
                        value="Yes"
                        checked={formData.previous_club_experience === 'Yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary bg-[#0a0f1d] border-gray-600 focus:ring-primary focus:ring-offset-[#111827]"
                      />
                      <span className="text-gray-300">Yes</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="previous_club_experience" 
                        value="No"
                        checked={formData.previous_club_experience === 'No'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary bg-[#0a0f1d] border-gray-600 focus:ring-primary focus:ring-offset-[#111827]"
                      />
                      <span className="text-gray-300">No</span>
                    </label>
                  </div>
                </div>

                {formData.previous_club_experience === 'Yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Club Name(s) *</label>
                    <input 
                      type="text" 
                      name="club_names"
                      required={formData.previous_club_experience === 'Yes'}
                      value={formData.club_names}
                      onChange={handleChange}
                      className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="e.g. GDSC, E-Cell"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio / Work Link (Optional)</label>
                  <input 
                    type="url" 
                    name="portfolio_link"
                    value={formData.portfolio_link}
                    onChange={handleChange}
                    className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="https://yourportfolio.com or Drive link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information (Optional)</label>
                  <textarea 
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#0a0f1d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
                    placeholder="Anything else you'd like us to know?"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-600 text-white text-lg font-bold py-4 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
