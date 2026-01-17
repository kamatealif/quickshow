import dns from "dns";

// Force IPv4 first (critical for TMDB on some networks)
dns.setDefaultResultOrder("ipv4first");
