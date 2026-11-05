package com.app.infrastructure.database

import com.app.config.AppConfig
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import kotlinx.coroutines.Dispatchers
import org.flywaydb.core.Flyway
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

object DatabaseFactory {
    private var dataSource: HikariDataSource? = null

    fun init(config: AppConfig) {
        val hikariConfig = HikariConfig().apply {
            jdbcUrl = config.dbUrl
            username = config.dbUser
            password = config.dbPass
            driverClassName = "org.postgresql.Driver"
            maximumPoolSize = config.dbPoolSize
            minimumIdle = minOf(2, config.dbPoolSize)
            idleTimeout = 300_000 // 5 minutes
            maxLifetime = 1_800_000 // 30 minutes
            connectionTimeout = 10_000 // 10 seconds
            leakDetectionThreshold = 60_000 // 60 seconds
            isAutoCommit = false
            transactionIsolation = "TRANSACTION_REPEATABLE_READ"
            validate()
        }
        val ds = HikariDataSource(hikariConfig)
        dataSource = ds

        // 1. Run database migrations with Flyway
        Flyway.configure()
            .dataSource(ds)
            .locations("classpath:db/migration")
            .baselineOnMigrate(true)
            .placeholderReplacement(false)
            .load()
            .migrate()

        // 2. Connect Exposed
        Database.connect(ds)
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    fun close() {
        dataSource?.close()
    }
}
