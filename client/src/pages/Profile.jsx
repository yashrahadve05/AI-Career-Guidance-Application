import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SKILLS_OPTIONS = [
    "Programming",
    "Problem Solving",
    "Data Structures",
    "Algorithms",
    "JavaScript",
    "Python",
    "Git",
    "Database Design",
    "Statistics",
    "Data Analysis",
    "Machine Learning",
    "SQL",
    "R",
    "Data Visualization",
    "Communication",
    "Strategic Thinking",
    "Project Management",
    "Market Research",
    "Design Thinking",
    "User Research",
    "Prototyping",
    "Visual Design",
    "Linux",
    "Cloud Computing",
    "CI/CD",
    "Containerization",
    "Network Security",
    "Risk Assessment",
    "Incident Response",
    "SEO",
    "Content Marketing",
    "Social Media",
    "Analytics",
    "Requirements Analysis",
    "Process Modeling",
];

const INTERESTS_OPTIONS = [
    "Technology",
    "Problem Solving",
    "Innovation",
    "Coding",
    "Mathematics",
    "Analytics",
    "Research",
    "Business",
    "Strategy",
    "Design",
    "User Experience",
    "Creativity",
    "Infrastructure",
    "Automation",
    "Security",
    "Marketing",
    "Social Media",
    "Communication",
];

function Profile() {
    const { userId, getToken } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        skills: [],
        interests: [],
        education: { level: "High School", field: "" },
        experience: { level: "Entry", years: 0 },
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            const response = await axios.get("/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            if (error.response?.status === 404) {
                await createUser();
            }
        } finally {
            setLoading(false);
        }
    };

    const createUser = async () => {
        try {
            const token = await getToken();
            await axios.post(
                "/api/users/profile",
                {
                    email: user?.primaryEmailAddress?.email || "",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            await fetchProfile();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleSkillToggle = (skill) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill],
        }));
    };

    const handleInterestToggle = (interest) => {
        setProfile((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = await getToken();
            await axios.put("/api/users/profile", profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile saved successfully!");
            navigate("/assessment");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Your Profile
                </h1>
                <p className="text-gray-600 mb-8">
                    Tell us about your skills, interests, education, and
                    experience to get personalized career recommendations.
                </p>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS_OPTIONS.map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() => handleSkillToggle(skill)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        profile.skills.includes(skill)
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Interests
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {INTERESTS_OPTIONS.map((interest) => (
                                <button
                                    key={interest}
                                    onClick={() =>
                                        handleInterestToggle(interest)
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        profile.interests.includes(interest)
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Education Level
                            </h2>
                            <select
                                value={profile.education.level}
                                onChange={(e) =>
                                    setProfile((prev) => ({
                                        ...prev,
                                        education: {
                                            ...prev.education,
                                            level: e.target.value,
                                        },
                                    }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="High School">High School</option>
                                <option value="Associate">Associate</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Education Field
                            </h2>
                            <input
                                type="text"
                                value={profile.education.field}
                                onChange={(e) =>
                                    setProfile((prev) => ({
                                        ...prev,
                                        education: {
                                            ...prev.education,
                                            field: e.target.value,
                                        },
                                    }))
                                }
                                placeholder="e.g., Computer Science, Business"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Experience Level
                            </h2>
                            <select
                                value={profile.experience.level}
                                onChange={(e) =>
                                    setProfile((prev) => ({
                                        ...prev,
                                        experience: {
                                            ...prev.experience,
                                            level: e.target.value,
                                        },
                                    }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Entry">Entry</option>
                                <option value="Junior">Junior</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Executive">Executive</option>
                            </select>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Years of Experience
                            </h2>
                            <input
                                type="number"
                                min="0"
                                value={profile.experience.years}
                                onChange={(e) =>
                                    setProfile((prev) => ({
                                        ...prev,
                                        experience: {
                                            ...prev.experience,
                                            years:
                                                parseInt(e.target.value) || 0,
                                        },
                                    }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? "Saving..." : "Save & Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
