// app/admin/users/user-sheet.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Shield,
  User,
  Phone,
  AtSign,
  Fingerprint,
  Calendar,
  Terminal,
} from "lucide-react";

export default function UserSheet({ user }: { user: any }) {
  const itemStyle =
    "flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors";
  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3";

  return (
    <div className="flex flex-col h-full">
      <div className="p-10 space-y-12 overflow-y-auto">
        {/* Visual Identity Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase font-mono">
              Personnel_Asset_Acquired
            </span>
          </div>
          <div className="h-24 w-24 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center shadow-2xl shadow-primary/5">
            <User className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
              {user.full_name || "Unidentified Identity"}
            </h2>
            <p className="text-sm font-mono text-zinc-600 mt-2 lowercase">
              {user.email}
            </p>
          </div>
        </div>

        {/* System Metadata Grid */}
        <div className="space-y-4">
          <div className={itemStyle}>
            <span className={labelStyle}>
              <Shield className="w-3.5 h-3.5" /> Authorization
            </span>
            <Badge
              className={
                user.is_admin
                  ? "bg-primary text-black font-black"
                  : "bg-zinc-800 text-zinc-500 font-bold"
              }
            >
              {user.is_admin ? "ADMIN_TERMINAL" : "USER_TERMINAL"}
            </Badge>
          </div>

          <div className={itemStyle}>
            <span className={labelStyle}>
              <Fingerprint className="w-3.5 h-3.5" /> Registry ID
            </span>
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase truncate max-w-[150px]">
              {user.id}
            </span>
          </div>

          <div className={itemStyle}>
            <span className={labelStyle}>
              <AtSign className="w-3.5 h-3.5" /> Username
            </span>
            <span className="text-xs font-black text-white italic tracking-tighter">
              @{user.username || "NOT_ASSIGNED"}
            </span>
          </div>

          <div className={itemStyle}>
            <span className={labelStyle}>
              <Phone className="w-3.5 h-3.5" /> Contact Hash
            </span>
            <span className="text-xs font-mono font-bold text-zinc-300">
              {user.phone || "UNLINKED"}
            </span>
          </div>

          <div className={itemStyle}>
            <span className={labelStyle}>
              <Calendar className="w-3.5 h-3.5" /> Initial Sync
            </span>
            <span className="text-xs font-mono font-bold text-zinc-300">
              {new Date(user.created_at).toLocaleDateString().toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto p-10 border-t border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-2 mb-2 text-primary/60">
          <Shield className="w-3 h-3" />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Security Protocol Alpha
          </span>
        </div>
        <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 leading-relaxed">
          Personnel records are synchronized with the primary auth node.
          Multi-factor authentication is recommended for all privileged
          identities.
        </p>
      </div>
    </div>
  );
}
