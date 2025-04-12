'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile, uploadPostWithMedia } from '@/api/service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch' // Make sure this exists or use a lib like radix or shadcn
import { ArrowLeft, Crown } from 'lucide-react'
import Image from 'next/image'

export default function NewPostPage() {
  const router = useRouter()

  const [captionText, setCaptionText] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [username, setUsername] = useState('')
  const [profilePicUrl, setProfilePicUrl] = useState('')
  const [profileVIP, setProfileVIP] = useState(false)
  const [isPublic, setIsPublic] = useState(true)

  const baseUrl = 'http://127.0.0.1:8000'

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem('userToken')
      if (token) {
        try {
          const profile = await getProfile(token)
          setUsername(profile.username || 'User')
          setProfilePicUrl(profile.profile_pic || '')
          setProfileVIP(profile.is_vip || false)
        } catch (err) {
          console.error('Error loading profile:', err)
        }
      }
    }
    fetchProfile()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  const extractTagsAndCaption = (text: string): { tags: string[], caption: string } => {
    const tagRegex = /#(\w+)/g
    const tags: string[] = []
    let match
    while ((match = tagRegex.exec(text)) !== null) {
      tags.push(match[1])
    }
    const captionWithoutTags = text.replace(tagRegex, '').trim()
    return { tags, caption: captionWithoutTags }
  }

  const handlePost = async () => {
    const token = localStorage.getItem('userToken') || ''
    if (!token) return

    const { tags, caption } = extractTagsAndCaption(captionText)

    console.log('Posting...', { caption, tags, isPublic, files })

    try {
      await uploadPostWithMedia(caption, tags, isPublic, files, token)
      //return page
      router.back()
    } catch (error) {
      console.error('Error uploading post:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-black text-white">
      {/* Top Bar */}
      <div className="flex items-center gap-4">
        <Button size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <h1 className="text-xl font-semibold mx-auto">New Post</h1>
      </div>

      {/* Profile Info Panel */}
      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {profilePicUrl ? (
            <Image
              src={`${baseUrl}${profilePicUrl}`}
              alt="Profile"
              fill
              className="object-cover"
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          ) : (
            <div className="w-12 h-12 bg-gray-700 rounded-full" />
          )}
        </div>
        <span className="font-semibold text-base flex items-center gap-2">
          @{username}
          {profileVIP && <Crown style={{ width: "15px", height: "15px" }}/>}
        </span>
      </div>

      {/* Caption Input */}
      <Textarea
        placeholder="Write a caption (hashtags like #art #fun will be tagged)..."
        value={captionText}
        onChange={(e) => setCaptionText(e.target.value)}
        className="min-h-[100px] bg-gray-800 border border-gray-700 text-white"
      />

      {/* Public / Private Switch */}
      <div className="flex items-center gap-2">
        <Switch
          checked={isPublic}
          onCheckedChange={() => setIsPublic(!isPublic)}
        />
        <span className="text-sm text-gray-300">{isPublic ? 'Public' : 'Private'}</span>
      </div>

      {/* Upload Section */}
      <div className="flex flex-col items-start">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer text-blue-400 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 3a2 2 0 00-2 2v2h2V5h12v2h2V5a2 2 0 00-2-2H4z" />
            <path d="M3 9a1 1 0 011-1h12a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          Upload media
        </label>
        <Input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {files && (
          <p className="text-sm text-gray-400 mt-1">
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Post + Cancel buttons */}
      <div className="mt-auto flex flex-col gap-2 pb-4" style={{ marginBottom: '70px' }}>
        <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handlePost}>
          Post
        </Button>
        <Button
          variant="ghost"
          className="w-full text-red-500 hover:bg-transparent hover:underline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
