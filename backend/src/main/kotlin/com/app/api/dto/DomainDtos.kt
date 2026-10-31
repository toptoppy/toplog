package com.app.api.dto

import com.app.domain.model.DnsStatus
import kotlinx.serialization.Serializable

@Serializable
data class VerifyDomainResponse(
    val domain: String,
    val dnsStatus: DnsStatus,
    val verified: Boolean,
    val detectedIps: List<String>,
    val expectedCnameOrIp: String,
    val message: String
)
