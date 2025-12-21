import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Assessment() {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [profile, setProfile] = useState(null);

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

            if (
                response.data.skills.length === 0 &&
                response.data.interests.length === 0
            ) {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            navigate("/profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const token = await getToken();

            await axios.put(
                "/api/users/profile",
                {
                    ...profile,
                    assessmentCompleted: true,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting assessment:", error);
            alert("Failed to submit assessment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Career Assessment
                </h1>
                <p className="text-gray-600 mb-8">
                    Review your profile information below. Once you confirm,
                    we'll analyze your profile and provide personalized career
                    recommendations.
                </p>

                <div className="space-y-6 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">
                            Your Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">
                                    No skills selected
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">
                            Your Interests
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.length > 0 ? (
                                profile.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                                    >
                                        {interest}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500">
                                    No interests selected
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                                Education
                            </h2>
                            <p className="text-gray-600">
                                <span className="font-medium">Level:</span>{" "}
                                {profile.education.level}
                            </p>
                            {profile.education.field && (
                                <p className="text-gray-600">
                                    <span className="font-medium">Field:</span>{" "}
                                    {profile.education.field}
                                </p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                                Experience
                            </h2>
                            <p className="text-gray-600">
                                <span className="font-medium">Level:</span>{" "}
                                {profile.experience.level}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Years:</span>{" "}
                                {profile.experience.years}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> Our AI will analyze your profile
                        using the following weights: Skills (40%), Interests
                        (30%), Education (20%), and Experience (10%).
                    </p>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => navigate("/profile")}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Processing..." : "Get Recommendations"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Assessment;
