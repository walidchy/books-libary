import React from 'react';
import { BookOpenIcon, HeartIcon, GlobeAltIcon, SparklesIcon, ShieldCheckIcon, RocketLaunchIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutPage = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: BookOpenIcon,
      title: t('about.features.extensiveCollection.title'),
      description: t('about.features.extensiveCollection.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HeartIcon,
      title: t('about.features.personalLibrary.title'),
      description: t('about.features.personalLibrary.description'),
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: GlobeAltIcon,
      title: t('about.features.openLibrary.title'),
      description: t('about.features.openLibrary.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: SparklesIcon,
      title: t('about.features.modernExperience.title'),
      description: t('about.features.modernExperience.description'),
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const stats = [
    { value: '10K+', label: t('about.stats.booksAvailable') },
    { value: '50K+', label: t('about.stats.activeReaders') },
    { value: '100+', label: t('about.stats.categories') },
    { value: '4.9', label: t('about.stats.userRating') }
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: t('about.values.privacy.title'),
      description: t('about.values.privacy.description')
    },
    {
      icon: RocketLaunchIcon,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: UsersIcon,
      title: t('about.values.community.title'),
      description: t('about.values.community.description')
    }
  ];

  const techStack = [
    { name: 'React', description: t('about.technologies.react'), color: 'from-cyan-400 to-blue-500' },
    { name: 'Tailwind CSS', description: t('about.technologies.tailwind'), color: 'from-teal-400 to-cyan-500' },
    { name: 'Open Library API', description: t('about.technologies.openLibrary'), color: 'from-orange-400 to-red-500' },
    { name: 'Vite', description: t('about.technologies.vite'), color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium animate-fade-in">
              <SparklesIcon className="h-4 w-4" />
              <span>{t('about.aboutUs')}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white animate-fade-up">
              {t('about.welcomeTo')}
              <span className="block gradient-text mt-2">{t('about.appName')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-up animation-delay-200">
              {t('about.tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('about.whyChoose')} <span className="gradient-text">{t('about.appName')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group card-interactive p-8 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`relative p-4 bg-gradient-to-br ${feature.color} bg-opacity-10 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('about.ourMission')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('about.coreValues')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-4">
                  <value.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('about.builtWith')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="group relative card-interactive p-6 text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 relative z-10">
                  {tech.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-center text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.readyToStart')}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {t('about.readyDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
                  {t('about.browseBooks')}
                </a>
                <a href="/categories" className="btn bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 px-8 py-3">
                  {t('about.exploreCategories')}
                </a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.getInTouch')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('about.contactMessage')}
            </p>
            <button className="btn-primary">
              {t('about.contactUs')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
