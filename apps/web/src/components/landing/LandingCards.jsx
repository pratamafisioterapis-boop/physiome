
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export const PricingCard = ({ name, price, period = '/bln', description, features, highlighted = false, delay = 0, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`relative rounded-[2rem] p-8 flex flex-col h-full transition-all duration-300 ${
      highlighted 
        ? 'bg-secondary text-secondary-foreground shadow-soft-lg scale-105 z-10 border border-secondary' 
        : 'bg-card text-foreground shadow-soft border border-border/50'
    }`}
  >
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
        Paling Populer
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className={highlighted ? 'text-secondary-foreground/70' : 'text-muted-foreground'}>{description}</p>
    </div>
    
    <div className="mb-8">
      <span className="text-5xl font-extrabold tracking-tight">{price}</span>
      {price !== 'Custom' && <span className={`text-lg font-medium ml-1 ${highlighted ? 'text-secondary-foreground/70' : 'text-muted-foreground'}`}>{period}</span>}
    </div>
    
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${highlighted ? 'text-accent' : 'text-primary'}`} /> 
          <span className="font-medium leading-snug">{feat}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-auto">
      <Button
        onClick={onSelect}
        className={`w-full h-14 rounded-xl text-base font-bold transition-all duration-300 ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary'
            : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {price === 'Custom' ? 'Hubungi Sales' : 'Mulai Sekarang'}
      </Button>
    </div>
  </motion.div>
);

export const TestimonialCard = ({ quote, name, title, clinic, photo, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-[2rem] p-8 md:p-10 shadow-soft border border-border/50 flex flex-col h-full"
  >
    <div className="mb-8">
      <div className="flex gap-1 mb-6">
        {[1,2,3,4,5].map(star => (
          <svg key={star} className="w-5 h-5 text-[#F59E0B] fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-foreground text-lg md:text-xl font-medium leading-relaxed italic">"{quote}"</p>
    </div>
    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
      <img src={photo} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-primary-light" />
      <div>
        <h4 className="font-bold text-foreground text-lg">{name}</h4>
        <p className="text-sm font-medium text-muted-foreground">{title}, <span className="text-primary">{clinic}</span></p>
      </div>
    </div>
  </motion.div>
);

export const StepCard = ({ number, title, description, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative bg-card rounded-[2rem] p-8 shadow-soft border border-border/50 z-10 hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center text-primary font-extrabold text-2xl mb-6 shadow-glow-primary">
      {number}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed font-medium">{description}</p>
  </motion.div>
);

export const AICapabilityCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex gap-6 p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-border/50"
  >
    <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center text-primary shrink-0">
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <h4 className="text-xl font-bold mb-2 text-foreground">{title}</h4>
      <p className="text-muted-foreground leading-relaxed font-medium">{description}</p>
    </div>
  </motion.div>
);

export const StatCard = ({ label, value, trend, trendValue }) => (
  <div className="glass p-6 rounded-2xl flex flex-col gap-2">
    <p className="text-sm font-semibold text-secondary-navy/70 dark:text-white/70 uppercase tracking-wider">{label}</p>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-extrabold text-foreground">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${
          trend === 'up' ? 'bg-success/10 text-success' : trend === 'down' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          {trendValue}
        </div>
      )}
    </div>
  </div>
);
