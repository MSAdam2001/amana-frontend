'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getMyArtisanProfile, updateMyArtisanProfile, uploadPhoto } from '@/lib/api/profiles';

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  const [bio, setBio] = useState('');
  const [yearsExperience, setYearsExperience] = useState(0);
  const [skillsText, setSkillsText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('amana_token');
    if (!token) {
      router.push('/login');
      return;
    }

    getMyArtisanProfile()
      .then((profile) => {
        setBio(profile.bio || '');
        setYearsExperience(profile.yearsExperience);
        setSkillsText(profile.skills.join(', '));
        setPhotos(profile.portfolioPhotos);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const url = await uploadPhoto(file);
      setPhotos((prev) => [...prev, url]);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaved(false);

    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      await updateMyArtisanProfile({ bio, yearsExperience, skills, portfolioPhotos: photos });
      setSaved(true);
      setBio('');
      setYearsExperience(0);
      setSkillsText('');
      setPhotos([]);
      router.push('/dashboard');
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save your profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center px-6 text-center">
        <p className="font-body text-teal-800">
          You don&apos;t have an artisan profile yet. Create one before you can edit it.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Your profile
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-2">
          Show customers why they should trust you
        </h1>
        <p className="font-body text-teal-800/70 mb-8">
          This is what a customer sees before they decide to hire you. Be specific, real
          experience and real work speak louder than a generic bio.
        </p>

        <form onSubmit={handleSubmit} className="bg-white border border-teal-800/10 rounded-sm p-6 flex flex-col gap-5">
          <div>
            <label className="font-body font-medium text-teal-900 block mb-1">About you</label>
            <p className="font-body text-sm text-teal-800/60 mb-2">
              Tell customers who you are, what you specialize in, and what makes your work reliable.
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="e.g. Experienced electrician serving Kano for 10 years, specializing in home rewiring and solar installations..."
              className="font-body w-full p-2 border border-teal-800/20 rounded-sm text-sm"
            />
          </div>

          <div>
            <label className="font-body font-medium text-teal-900 block mb-1">
              Years of experience
            </label>
            <input
              type="number"
              min={0}
              value={yearsExperience}
              onChange={(e) => setYearsExperience(parseInt(e.target.value) || 0)}
              className="font-body w-32 p-2 border border-teal-800/20 rounded-sm text-sm"
            />
          </div>

          <div>
            <label className="font-body font-medium text-teal-900 block mb-1">Skills</label>
            <p className="font-body text-sm text-teal-800/60 mb-2">
              Separate each skill with a comma, e.g. Pipe repair, Installation, Emergency callout
            </p>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Pipe repair, Installation, Emergency callout"
              className="font-body w-full p-2 border border-teal-800/20 rounded-sm text-sm"
            />
          </div>

          <div>
            <label className="font-body font-medium text-teal-900 block mb-1">
              Photos of your work
            </label>
            <p className="font-body text-sm text-teal-800/60 mb-2">
              Upload real photos of completed jobs. Customers trust these far more than a bio alone.
            </p>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                {photos.map((url, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Work sample ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-white/90 text-teal-900 rounded-full w-6 h-6 text-sm leading-none hover:bg-white"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={handleFileSelected}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="font-body inline-block cursor-pointer border border-teal-800/30 hover:border-teal-800 text-teal-900 px-4 py-2 rounded-sm text-sm transition-colors"
            >
              {uploading ? 'Uploading...' : '+ Add a photo'}
            </label>

            {uploadError && (
              <p className="font-body text-red-600 text-sm mt-2">{uploadError}</p>
            )}
          </div>

          {saveError && <p className="font-body text-red-600 text-sm">{saveError}</p>}
          {saved && <p className="font-body text-teal-800 font-medium text-sm">Profile updated.</p>}

          <button
            type="submit"
            disabled={saving}
            className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-6 py-3 rounded-sm transition-colors self-start"
          >
            {saving ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      </div>
    </main>
  );
}