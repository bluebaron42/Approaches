import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Bell, Cookie, Zap, Mouse, BarChart3 } from 'lucide-react';

interface ConditioningLabProps {
  themeColor: string;
  isPresentation: boolean;
}

type LabMode = 'menu' | 'classical' | 'operant' | 'schedules';
type ClassicalPhase = 'before' | 'during' | 'after' | 'extinction';

export default function ConditioningLab({ themeColor, isPresentation }: ConditioningLabProps) {
  const [mode, setMode] = useState<LabMode>('menu');
  
  // Classical conditioning state
  const [classicalPhase, setClassicalPhase] = useState<ClassicalPhase>('before');
  const [pairings, setPairings] = useState(0);
  const [salivation, setSalivation] = useState(0);
  const [showFood, setShowFood] = useState(false);
  const [showBell, setShowBell] = useState(false);
  const [bellOnly, setBellOnly] = useState(false);
  
  // Operant conditioning state
  const [ratPresses, setRatPresses] = useState(0);
  const [ratBehavior, setRatBehavior] = useState('exploring');
  const [reinforcementHistory, setReinforcementHistory] = useState<string[]>([]);
  const [lastAction, setLastAction] = useState<'reward' | 'punish' | null>(null);
  
  // Schedules state
  const [schedule, setSchedule] = useState<'FR' | 'VR' | 'FI' | 'VI'>('FR');
  const [scheduleResponses, setScheduleResponses] = useState(0);
  const [scheduleRewards, setScheduleRewards] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState(0);
  const [canReward, setCanReward] = useState(true);

  const textSize = isPresentation ? 'text-lg' : 'text-base';

  // Classical conditioning logic
  const ringBell = () => {
    setShowBell(true);
    setTimeout(() => setShowBell(false), 500);
    
    if (classicalPhase === 'during') {
      // Pair with food
      setTimeout(() => {
        setShowFood(true);
        setSalivation(100);
        setTimeout(() => {
          setShowFood(false);
          setSalivation(0);
        }, 1000);
      }, 500);
      
      setPairings(prev => {
        const newPairings = prev + 1;
        if (newPairings >= 5) {
          setTimeout(() => setClassicalPhase('after'), 1500);
        }
        return newPairings;
      });
    } else if (classicalPhase === 'after') {
      // Conditioned response
      setSalivation(bellOnly ? pairings * 5 : 80);
      setBellOnly(true);
      setTimeout(() => setSalivation(0), 1500);
    } else if (classicalPhase === 'extinction') {
      setSalivation(Math.max(0, 60 - pairings * 15));
      setPairings(prev => prev + 1);
      setTimeout(() => setSalivation(0), 1000);
    }
  };

  const showFoodOnly = () => {
    setShowFood(true);
    setSalivation(100);
    setTimeout(() => {
      setShowFood(false);
      setSalivation(0);
    }, 1000);
  };

  // Operant conditioning logic
  const handleLeverPress = () => {
    setRatPresses(prev => prev + 1);
  };

  const giveReward = () => {
    setLastAction('reward');
    setReinforcementHistory(prev => [...prev, '🍪'].slice(-10));
    setRatBehavior('pressing more!');
    setTimeout(() => {
      setRatBehavior('exploring');
      setLastAction(null);
    }, 1500);
  };

  const givePunishment = () => {
    setLastAction('punish');
    setReinforcementHistory(prev => [...prev, '⚡'].slice(-10));
    setRatBehavior('avoiding lever!');
    setTimeout(() => {
      setRatBehavior('cautious');
      setLastAction(null);
    }, 1500);
  };

  // Schedules logic
  const schedulePress = useCallback(() => {
    setScheduleResponses(prev => prev + 1);
    
    let shouldReward = false;
    
    switch (schedule) {
      case 'FR': // Fixed Ratio - every 3 presses
        shouldReward = (scheduleResponses + 1) % 3 === 0;
        break;
      case 'VR': // Variable Ratio - average every 3, but random
        shouldReward = Math.random() < 0.33;
        break;
      case 'FI': // Fixed Interval - first press after 3 seconds
        shouldReward = canReward && intervalTimer >= 3;
        break;
      case 'VI': // Variable Interval - random intervals averaging 3 seconds
        shouldReward = canReward && Math.random() < 0.2;
        break;
    }
    
    if (shouldReward) {
      setScheduleRewards(prev => prev + 1);
      if (schedule === 'FI' || schedule === 'VI') {
        setCanReward(false);
        setIntervalTimer(0);
      }
    }
  }, [schedule, scheduleResponses, canReward, intervalTimer]);

  useEffect(() => {
    if (mode === 'schedules' && (schedule === 'FI' || schedule === 'VI')) {
      const timer = setInterval(() => {
        setIntervalTimer(prev => {
          if (prev >= 3 && schedule === 'FI') {
            setCanReward(true);
          } else if (schedule === 'VI' && Math.random() < 0.3) {
            setCanReward(true);
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, schedule]);

  const resetAll = () => {
    setMode('menu');
    setClassicalPhase('before');
    setPairings(0);
    setSalivation(0);
    setShowFood(false);
    setShowBell(false);
    setBellOnly(false);
    setRatPresses(0);
    setRatBehavior('exploring');
    setReinforcementHistory([]);
    setLastAction(null);
    setScheduleResponses(0);
    setScheduleRewards(0);
    setIntervalTimer(0);
    setCanReward(true);
  };

  if (mode === 'menu') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>🔬 Conditioning Lab</h3>
          <p className="text-gray-400">Choose an experiment to run</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setMode('classical')}
            className="bg-cyan-900/30 border border-cyan-500/50 rounded-xl p-6 hover:bg-cyan-900/50 transition-all text-left"
          >
            <Bell className="w-10 h-10 text-cyan-400 mb-3" />
            <h4 className="text-cyan-400 font-bold mb-2">Classical Conditioning</h4>
            <p className="text-gray-400 text-sm">Pavlov's Dog: Pair a bell with food to create a conditioned response</p>
          </button>
          
          <button
            onClick={() => setMode('operant')}
            className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 hover:bg-green-900/50 transition-all text-left"
          >
            <Mouse className="w-10 h-10 text-green-400 mb-3" />
            <h4 className="text-green-400 font-bold mb-2">Operant Conditioning</h4>
            <p className="text-gray-400 text-sm">Skinner Box: Use rewards and punishments to shape rat behaviour</p>
          </button>
          
          <button
            onClick={() => setMode('schedules')}
            className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-6 hover:bg-purple-900/50 transition-all text-left"
          >
            <BarChart3 className="w-10 h-10 text-purple-400 mb-3" />
            <h4 className="text-purple-400 font-bold mb-2">Schedules of Reinforcement</h4>
            <p className="text-gray-400 text-sm">Compare FR, VR, FI, VI schedules and response patterns</p>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'classical') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-cyan-400 font-bold text-xl">🐕 Pavlov's Dog Experiment</h3>
          <button onClick={resetAll} className="text-gray-400 hover:text-white flex items-center gap-2">
            <RotateCcw size={16} /> Back to Menu
          </button>
        </div>

        {/* Phase Indicator */}
        <div className="flex gap-2">
          {(['before', 'during', 'after', 'extinction'] as ClassicalPhase[]).map((p) => (
            <button
              key={p}
              onClick={() => { setClassicalPhase(p); setPairings(0); setBellOnly(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                classicalPhase === p 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {p === 'before' && 'Before Conditioning'}
              {p === 'during' && 'Acquisition'}
              {p === 'after' && 'After Conditioning'}
              {p === 'extinction' && 'Extinction'}
            </button>
          ))}
        </div>

        {/* Dog Display */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="text-8xl mb-4">🐕</div>
          
          {/* Salivation indicator */}
          <div className="absolute top-4 right-4 text-center">
            <p className="text-gray-500 text-xs mb-1">Salivation</p>
            <div className="w-20 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${salivation}%` }}
              />
            </div>
          </div>

          {/* Stimuli indicators */}
          <div className="flex justify-center gap-8 mt-4">
            <div className={`text-4xl transition-all duration-300 ${showBell ? 'scale-125' : 'scale-100 opacity-50'}`}>
              🔔 {showBell && <span className="text-sm">RING!</span>}
            </div>
            <div className={`text-4xl transition-all duration-300 ${showFood ? 'scale-125' : 'scale-100 opacity-50'}`}>
              🥩 {showFood && <span className="text-sm">YUM!</span>}
            </div>
          </div>

          {/* Phase info */}
          <div className="mt-6 text-gray-400 text-sm">
            {classicalPhase === 'before' && "Bell = Neutral Stimulus (no response). Food = Unconditioned Stimulus (salivation)."}
            {classicalPhase === 'during' && `Pairing bell with food... (${pairings}/5 pairings)`}
            {classicalPhase === 'after' && "Bell alone now produces salivation! (Conditioned Response)"}
            {classicalPhase === 'extinction' && `Bell without food... response weakening (${pairings} unreinforced trials)`}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={ringBell}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold flex items-center gap-2"
          >
            <Bell size={20} /> Ring Bell (NS/CS)
          </button>
          {classicalPhase === 'before' && (
            <button
              onClick={showFoodOnly}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold flex items-center gap-2"
            >
              <Cookie size={20} /> Show Food (UCS)
            </button>
          )}
        </div>

        {/* Key Terms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold">UCS</p>
            <p className="text-gray-400">Food (naturally triggers response)</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold">UCR</p>
            <p className="text-gray-400">Salivation to food</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold">NS → CS</p>
            <p className="text-gray-400">Bell (after pairing)</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold">CR</p>
            <p className="text-gray-400">Salivation to bell</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'operant') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-green-400 font-bold text-xl">🐀 Skinner Box</h3>
          <button onClick={resetAll} className="text-gray-400 hover:text-white flex items-center gap-2">
            <RotateCcw size={16} /> Back to Menu
          </button>
        </div>

        {/* Skinner Box */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center">
          <div className="flex justify-center items-end gap-8">
            <div className="text-6xl">🐀</div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleLeverPress}
                className="w-20 h-8 bg-gray-600 hover:bg-gray-500 rounded-t-lg border-2 border-gray-500 transition-all active:translate-y-1"
              >
                <span className="text-xs text-gray-300">LEVER</span>
              </button>
              <div className="w-24 h-2 bg-gray-700 rounded-b-lg" />
            </div>
          </div>
          
          <p className="text-gray-400 mt-4">
            Rat behavior: <span className={`font-bold ${lastAction === 'reward' ? 'text-green-400' : lastAction === 'punish' ? 'text-red-400' : 'text-gray-300'}`}>
              {ratBehavior}
            </span>
          </p>
          <p className="text-gray-500 text-sm">Lever presses: {ratPresses}</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={giveReward}
            className="py-4 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold flex items-center justify-center gap-2"
          >
            <Cookie size={24} /> Give Reward (+Reinforcement)
          </button>
          <button
            onClick={givePunishment}
            className="py-4 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold flex items-center justify-center gap-2"
          >
            <Zap size={24} /> Give Punishment
          </button>
        </div>

        {/* History */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Reinforcement History:</p>
          <div className="flex gap-2 min-h-8">
            {reinforcementHistory.map((item, i) => (
              <span key={i} className="text-2xl">{item}</span>
            ))}
          </div>
        </div>

        {/* Key Concepts */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
            <p className="text-green-400 font-bold">Positive Reinforcement</p>
            <p className="text-gray-400">Add something pleasant → behaviour increases</p>
          </div>
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/30">
            <p className="text-red-400 font-bold">Positive Punishment</p>
            <p className="text-gray-400">Add something unpleasant → behaviour decreases</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'schedules') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-purple-400 font-bold text-xl">📊 Schedules of Reinforcement</h3>
          <button onClick={resetAll} className="text-gray-400 hover:text-white flex items-center gap-2">
            <RotateCcw size={16} /> Back to Menu
          </button>
        </div>

        {/* Schedule Selector */}
        <div className="grid grid-cols-4 gap-2">
          {(['FR', 'VR', 'FI', 'VI'] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setSchedule(s); setScheduleResponses(0); setScheduleRewards(0); setIntervalTimer(0); setCanReward(true); }}
              className={`px-4 py-3 rounded-xl font-bold transition-all ${
                schedule === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Schedule Info */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-purple-400 font-bold mb-2">
            {schedule === 'FR' && '📊 Fixed Ratio: Reward every 3 responses'}
            {schedule === 'VR' && '🎲 Variable Ratio: Average 3 responses (random)'}
            {schedule === 'FI' && '⏱️ Fixed Interval: First response after 3 seconds'}
            {schedule === 'VI' && '🎰 Variable Interval: Random time intervals'}
          </p>
          <p className="text-gray-400 text-sm">
            {schedule === 'FR' && 'Produces high, steady response rate with pause after reward'}
            {schedule === 'VR' && 'Produces highest, most consistent response rate (gambling!)'}
            {schedule === 'FI' && 'Produces "scalloped" pattern - slow then fast near reward time'}
            {schedule === 'VI' && 'Produces slow, steady responding'}
          </p>
        </div>

        {/* Response Button */}
        <div className="text-center">
          <button
            onClick={schedulePress}
            className="w-32 h-32 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-bold text-xl transition-all active:scale-95"
          >
            PRESS
          </button>
          {(schedule === 'FI' || schedule === 'VI') && (
            <p className="text-gray-500 mt-2">Time: {intervalTimer}s | {canReward ? '✓ Reward available' : '⏳ Waiting...'}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Total Responses</p>
            <p className="text-white text-3xl font-bold">{scheduleResponses}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Rewards Earned</p>
            <p className="text-green-400 text-3xl font-bold">{scheduleRewards} 🍪</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
