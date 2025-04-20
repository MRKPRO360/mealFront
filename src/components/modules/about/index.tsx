import team from '@/assets/images/about/team.jpg';
import discussion from '@/assets/images/about/discussion.jpg';
import member1 from '@/assets/images/about/public-1.jpg';
import member2 from '@/assets/images/about/public-2.jpg';
import member3 from '@/assets/images/about/public-3.jpg';
import member4 from '@/assets/images/about/public-4.jpg';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Head Chef',
    bio: 'With 15 years of culinary experience, Alex creates most of our signature recipes.',
    avatar: member1,
  },
  {
    name: 'Maria Rodriguez',
    role: 'Nutritionist',
    bio: 'Maria ensures our recipes are both delicious and nutritionally balanced.',
    avatar: member2,
  },
  {
    name: 'Jamie Wilson',
    role: 'Food Photographer',
    bio: 'Jamie makes our recipes look as good as they taste with stunning photography.',
    avatar: member3,
  },
  {
    name: 'Taylor Smith',
    role: 'Community Manager',
    bio: 'Taylor connects with our community and gathers feedback to improve your experience.',
    avatar: member4,
  },
];

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChefHat, Leaf, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className=" bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="h-[75vh] relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-300 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 rounded-full -ml-32 -mb-32"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mt-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Recipe Story
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Bringing people together through the joy of cooking and sharing
              delicious meals
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-xs hover:shadow-sm pb-2 transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <ChefHat className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-center">Simplify Cooking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We make cooking accessible to everyone with easy-to-follow
                  recipes and clear instructions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-xs hover:shadow-sm pb-2 transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Leaf className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-center">
                  Promote Healthy Eating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Our recipes focus on fresh, wholesome ingredients to support a
                  healthy lifestyle.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-xs hover:shadow-sm pb-2 transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-center">Build Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We believe food brings people together and creates lasting
                  memories.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
                How It All Began
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our journey started in a small kitchen with a passion for good
                food and a desire to share it with others. What began as a
                personal collection of family recipes quickly grew into a
                community of food lovers.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Today, we&apos;re proud to be a trusted resource for home cooks
                of all skill levels, offering thousands of tested recipes,
                cooking tips, and meal planning ideas.
              </p>
              <Link href="/menu">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Explore Our Recipes <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="relative ">
                <Image
                  src={team}
                  alt="Our team"
                  className="object-cover rounded-sm shadow-xs hover:scale-105 hover:shadow-md transition ease-in-out duration-300"
                  width={600}
                  height={400}
                />

                <div className="absolute -bottom-8 -right-6 hover:scale-105 hover:shadow-md transition ease-in-out duration-300">
                  <Image
                    src={discussion}
                    alt="taking decision with our team"
                    className=" w-[300px] h-auto object-cover rounded-sm shadow-xs"
                    width={256}
                    height={256}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center rounded-xs hover:shadow-sm pb-2 transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                      {!member.avatar && (
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-green-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of home cooks who trust our recipes to bring
            delicious meals to their tables every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/menu">
              <Button className="border border-transparent">
                Browse Recipes <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                className=" bg-green-700 font-bold text-lg"
              >
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
